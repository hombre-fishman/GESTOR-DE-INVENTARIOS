-- ==========================================
-- CREAR PERFIL AUTOMÁTICAMENTE
-- ==========================================

CREATE OR REPLACE FUNCTION public.crear_perfil_usuario()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN

    INSERT INTO public.perfiles (
        id,
        nombre,
        rol
    )
    VALUES (
        NEW.id,
        COALESCE(
            NULLIF(NEW.raw_user_meta_data ->> 'nombre', ''),
            SPLIT_PART(COALESCE(NEW.email, ''), '@', 1),
            'Usuario'
        ),
        'EMPLEADO'
    );

    RETURN NEW;

END;
$$;


CREATE TRIGGER crear_perfil_al_registrar_usuario
AFTER INSERT
ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.crear_perfil_usuario();


-- ==========================================
-- REGISTRAR ENTRADAS Y SALIDAS
-- ==========================================

CREATE OR REPLACE FUNCTION public.registrar_movimiento(
    p_producto_id BIGINT,
    p_tipo TEXT,
    p_cantidad INTEGER,
    p_motivo TEXT DEFAULT NULL,
    p_proveedor_id BIGINT DEFAULT NULL
)
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE

    v_stock INTEGER;
    v_movimiento_id BIGINT;

BEGIN

    IF auth.uid() IS NULL THEN
        RAISE EXCEPTION 'Debes iniciar sesión';
    END IF;


    IF p_cantidad <= 0 THEN
        RAISE EXCEPTION
            'La cantidad debe ser mayor que cero';
    END IF;


    IF p_tipo NOT IN ('ENTRADA', 'SALIDA') THEN
        RAISE EXCEPTION
            'Tipo de movimiento inválido';
    END IF;


    SELECT stock
    INTO v_stock
    FROM public.productos
    WHERE id = p_producto_id
      AND activo = TRUE
    FOR UPDATE;


    IF NOT FOUND THEN
        RAISE EXCEPTION
            'El producto no existe';
    END IF;


    IF p_tipo = 'SALIDA'
       AND v_stock < p_cantidad THEN

        RAISE EXCEPTION
            'Stock insuficiente';

    END IF;


    IF p_tipo = 'ENTRADA' THEN

        UPDATE public.productos
        SET
            stock = stock + p_cantidad,
            updated_at = NOW()
        WHERE id = p_producto_id;

    ELSE

        UPDATE public.productos
        SET
            stock = stock - p_cantidad,
            updated_at = NOW()
        WHERE id = p_producto_id;

    END IF;


    INSERT INTO public.movimientos_inventario (
        producto_id,
        tipo,
        cantidad,
        motivo,
        proveedor_id,
        usuario_id
    )
    VALUES (
        p_producto_id,
        p_tipo,
        p_cantidad,
        p_motivo,
        p_proveedor_id,
        auth.uid()
    )
    RETURNING id
    INTO v_movimiento_id;


    RETURN v_movimiento_id;

END;
$$;


-- ==========================================
-- PERMISOS PARA LA FUNCIÓN
-- ==========================================

REVOKE EXECUTE
ON FUNCTION public.registrar_movimiento(
    BIGINT,
    TEXT,
    INTEGER,
    TEXT,
    BIGINT
)
FROM PUBLIC;


REVOKE EXECUTE
ON FUNCTION public.registrar_movimiento(
    BIGINT,
    TEXT,
    INTEGER,
    TEXT,
    BIGINT
)
FROM anon;


GRANT EXECUTE
ON FUNCTION public.registrar_movimiento(
    BIGINT,
    TEXT,
    INTEGER,
    TEXT,
    BIGINT
)
TO authenticated;