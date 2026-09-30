-- ============================================
-- GESTOR DE INVENTARIOS
-- MIGRACIÓN INICIAL
-- ============================================


-- ============================================
-- CATEGORÍAS
-- ============================================

CREATE TABLE public.categorias (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================
-- PROVEEDORES
-- ============================================

CREATE TABLE public.proveedores (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    contacto VARCHAR(150),
    telefono VARCHAR(30),
    email VARCHAR(150),
    direccion TEXT,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================
-- PERFILES
-- ============================================

CREATE TABLE public.perfiles (
    id UUID PRIMARY KEY
        REFERENCES auth.users(id)
        ON DELETE CASCADE,

    nombre VARCHAR(150),

    rol VARCHAR(20)
        NOT NULL
        DEFAULT 'EMPLEADO'
        CHECK (rol IN ('ADMIN', 'EMPLEADO')),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- ============================================
-- PRODUCTOS
-- ============================================

CREATE TABLE public.productos (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    codigo VARCHAR(50) NOT NULL UNIQUE,

    nombre VARCHAR(150) NOT NULL,

    descripcion TEXT,

    categoria_id BIGINT
        REFERENCES public.categorias(id)
        ON DELETE SET NULL,

    proveedor_id BIGINT
        REFERENCES public.proveedores(id)
        ON DELETE SET NULL,

    precio_compra NUMERIC(10,2)
        NOT NULL DEFAULT 0
        CHECK (precio_compra >= 0),

    precio_venta NUMERIC(10,2)
        NOT NULL DEFAULT 0
        CHECK (precio_venta >= 0),

    stock INTEGER
        NOT NULL DEFAULT 0
        CHECK (stock >= 0),

    stock_minimo INTEGER
        NOT NULL DEFAULT 0
        CHECK (stock_minimo >= 0),

    unidad VARCHAR(30)
        DEFAULT 'PIEZA',

    activo BOOLEAN
        NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ
        NOT NULL DEFAULT NOW(),

    updated_at TIMESTAMPTZ
        NOT NULL DEFAULT NOW()
);


-- ============================================
-- MOVIMIENTOS DE INVENTARIO
-- ============================================

CREATE TABLE public.movimientos_inventario (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    producto_id BIGINT
        NOT NULL
        REFERENCES public.productos(id),

    tipo VARCHAR(10)
        NOT NULL
        CHECK (tipo IN ('ENTRADA', 'SALIDA')),

    cantidad INTEGER
        NOT NULL
        CHECK (cantidad > 0),

    motivo TEXT,

    proveedor_id BIGINT
        REFERENCES public.proveedores(id)
        ON DELETE SET NULL,

    usuario_id UUID
        REFERENCES auth.users(id)
        ON DELETE SET NULL,

    created_at TIMESTAMPTZ
        NOT NULL DEFAULT NOW()
);


-- ============================================
-- RLS
-- ============================================

ALTER TABLE public.categorias
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.proveedores
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.productos
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.movimientos_inventario
ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.perfiles
ENABLE ROW LEVEL SECURITY;


-- ============================================
-- POLÍTICAS: CATEGORÍAS
-- ============================================

CREATE POLICY "Ver categorias"
ON public.categorias
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Crear categorias"
ON public.categorias
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Editar categorias"
ON public.categorias
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);


-- ============================================
-- POLÍTICAS: PROVEEDORES
-- ============================================

CREATE POLICY "Ver proveedores"
ON public.proveedores
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Crear proveedores"
ON public.proveedores
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Editar proveedores"
ON public.proveedores
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);


-- ============================================
-- POLÍTICAS: PRODUCTOS
-- ============================================

CREATE POLICY "Ver productos"
ON public.productos
FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Crear productos"
ON public.productos
FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Editar productos"
ON public.productos
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);


-- ============================================
-- POLÍTICAS: MOVIMIENTOS
-- ============================================

CREATE POLICY "Ver movimientos"
ON public.movimientos_inventario
FOR SELECT
TO authenticated
USING (true);


-- ============================================
-- POLÍTICAS: PERFILES
-- ============================================

CREATE POLICY "Ver mi perfil"
ON public.perfiles
FOR SELECT
TO authenticated
USING (
    id = (SELECT auth.uid())
);

CREATE POLICY "Editar mi perfil"
ON public.perfiles
FOR UPDATE
TO authenticated
USING (
    id = (SELECT auth.uid())
)
WITH CHECK (
    id = (SELECT auth.uid())
);