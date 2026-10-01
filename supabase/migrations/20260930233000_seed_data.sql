
-- 1.CATEGORÍAS

INSERT INTO public.categorias (nombre, descripcion) VALUES
('Electrónica', 'Dispositivos, periféricos y accesorios de cómputo'),
('Papelería y Oficina', 'Artículos de escritorio y material impreso'),
('Abarrotes y Alimentos', 'Consumibles, bebidas y snacks para oficina'),
('Limpieza y Hogar', 'Productos de limpieza e higiene'),
('Herramientas y Ferretería', 'Mantenimiento e infraestructura');

-- 2.PROVEEDORES

INSERT INTO public.proveedores (nombre, contacto, telefono, email, direccion) VALUES
('Distribuidora Central S.A.', 'Carlos Mendoza', '555-0101', 'contacto@distcentral.com', 'Av. Principal 123'),
('Comercializadora del Norte', 'Ana López', '555-0202', 'ventas@comernorte.com', 'Calle Industrial 45'),
('Importaciones Globales', 'Roberto Gómez', '555-0303', 'info@impglobales.com', 'Zona Franca Bodega 8'),
('Proveedora Industrial', 'Mariana Torres', '555-0404', 'ventas@proindustrial.com', 'Carretera Nacional Km 12'),
('Suministros & Logística', 'Fernando Ruiz', '555-0505', 'contacto@sumlog.com', 'Parque Empresarial Sur');

-- 3.PRODUCTOS 

INSERT INTO public.productos 
(codigo, nombre, descripcion, categoria_id, proveedor_id, precio_compra, precio_venta, stock, stock_minimo, unidad) 
VALUES

-- Electrónica (Categoría 1)
('PROD-001', 'Monitor LED 24"', 'Monitor IPS Full HD 75Hz', 1, 1, 1200.00, 1750.00, 15, 3, 'PIEZA'),
('PROD-002', 'Teclado Mecánico RGB', 'Switch azul, distribución en español', 1, 1, 450.00, 750.00, 25, 5, 'PIEZA'),
('PROD-003', 'Mouse Inalámbrico Ergonómico', 'Sensor óptico 1600 DPI', 1, 2, 150.00, 280.00, 40, 8, 'PIEZA'),
('PROD-004', 'Audífonos Bluetooth', 'Cancelación de ruido activa', 1, 3, 600.00, 999.00, 12, 4, 'PIEZA'),
('PROD-005', 'Disco Duro Externo 1TB', 'USB 3.0 ultra rápido', 1, 1, 800.00, 1250.00, 18, 5, 'PIEZA'),
('PROD-006', 'Memoria USB 64GB', 'USB 3.1 metálica', 1, 2, 85.00, 160.00, 60, 10, 'PIEZA'),
('PROD-007', 'Cable HDMI 2.0 2m', 'Soporta resolución 4K a 60Hz', 1, 3, 40.00, 95.00, 50, 10, 'PIEZA'),
('PROD-008', 'Cargador Carga Rápida 65W', 'Puerto USB-C Power Delivery', 1, 4, 220.00, 390.00, 30, 5, 'PIEZA'),
('PROD-009', 'WebCam Full HD 1080p', 'Micrófono integrado para videoconferencias', 1, 1, 350.00, 580.00, 14, 3, 'PIEZA'),
('PROD-010', 'Hub USB-C 7 en 1', 'HDMI, SD, USB 3.0 y passthrough PD', 1, 3, 310.00, 520.00, 20, 5, 'PIEZA'),

-- Papelería y Oficina (Categoría 2)
('PROD-011', 'Paquete Papel Bond Carta', '500 hojas de 75g/m²', 2, 2, 80.00, 125.00, 100, 20, 'PAQUETE'),
('PROD-012', 'Caja de Bolígrafos Tinta Negra', 'Caja con 12 piezas punto mediano', 2, 2, 35.00, 65.00, 80, 15, 'CAJA'),
('PROD-013', 'Silla de Oficina Ergonómica', 'Respaldo de malla con soporte lumbar', 2, 5, 1400.00, 2200.00, 8, 2, 'PIEZA'),
('PROD-014', 'Organizador de Escritorio', 'Malla metálica negra con 4 compartimentos', 2, 2, 110.00, 190.00, 22, 5, 'PIEZA'),
('PROD-015', 'Engrapadora de Alto Rendimiento', 'Capacidad hasta 40 hojas', 2, 4, 130.00, 210.00, 15, 3, 'PIEZA'),
('PROD-016', 'Tijeras de Oficina 8"', 'Hojas de acero inoxidable', 2, 2, 25.00, 50.00, 35, 8, 'PIEZA'),
('PROD-017', 'Cuaderno Profesional Raya', '100 hojas pasta dura', 2, 2, 40.00, 75.00, 50, 10, 'PIEZA'),
('PROD-018', 'Paquete Marcadores Resaltadores', '5 colores neón surtidos', 2, 2, 45.00, 85.00, 45, 10, 'PAQUETE'),
('PROD-019', 'Calculadora Científica', '240 funciones pantalla de 2 líneas', 2, 1, 180.00, 310.00, 16, 4, 'PIEZA'),
('PROD-020', 'Pizarrón Blanco 90x60 cm', 'Marco de aluminio imantado', 2, 5, 320.00, 520.00, 10, 2, 'PIEZA'),

-- Abarrotes y Alimentos (Categoría 3)
('PROD-021', 'Café en Grano Gourmet 1kg', 'Tueste medio 100% Arábica', 3, 5, 190.00, 310.00, 25, 5, 'PIEZA'),
('PROD-022', 'Caja Galletas Surtidas 500g', 'Surtido rico para reuniones', 3, 5, 60.00, 98.00, 30, 8, 'CAJA'),
('PROD-023', 'Té Verde Orgánico 20 Sobres', 'Infusión natural sin azúcar', 3, 5, 35.00, 60.00, 40, 10, 'CAJA'),
('PROD-024', 'Agua Mineral 1.5L', 'Paquete con 12 botellas', 3, 5, 110.00, 175.00, 20, 5, 'PAQUETE'),
('PROD-025', 'Barras de Cereal', 'Caja con 12 barras de avena y miel', 3, 5, 75.00, 120.00, 35, 8, 'CAJA'),
('PROD-026', 'Azúcar Estándar 1kg', 'Bolsa de azúcar refinada', 3, 5, 28.00, 42.00, 50, 12, 'PIEZA'),
('PROD-027', 'Sazonador / Crema para Café', 'Bote de 400g en polvo', 3, 5, 55.00, 89.00, 28, 6, 'PIEZA'),
('PROD-028', 'Chocolates Surtidos 250g', 'Variedad de chocolate con leche y oscuro', 3, 5, 85.00, 140.00, 18, 5, 'CAJA'),
('PROD-029', 'Frutos Secos Mixtos 500g', 'Almendra, nuez, arándano y cacahuate', 3, 5, 120.00, 185.00, 22, 5, 'PIEZA'),
('PROD-030', 'Refresco de Cola 2.5L', 'Paquete con 6 botellas', 3, 5, 140.00, 210.00, 15, 4, 'PAQUETE'),

-- Limpieza y Hogar (Categoría 4)
('PROD-031', 'Detergente Líquido Multiusos 5L', 'Para pisos y superficies lavables', 4, 4, 130.00, 210.00, 18, 4, 'PIEZA'),
('PROD-032', 'Desinfectante en Aerosol 400ml', 'Elimina 99.9% de gérmenes', 4, 4, 65.00, 105.00, 35, 8, 'PIEZA'),
('PROD-033', 'Papel Higiénico Hoja Doble', 'Paquete industrial con 12 rollos', 4, 4, 110.00, 170.00, 40, 10, 'PAQUETE'),
('PROD-034', 'Toallas de Papel Cocina', 'Paquete con 6 rollos absorbentes', 4, 4, 80.00, 130.00, 30, 8, 'PAQUETE'),
('PROD-035', 'Jabón Líquido Manos 1L', 'Aroma antibacterial aloe vera', 4, 4, 45.00, 78.00, 25, 6, 'PIEZA'),
('PROD-036', 'Limpiador de Vidrios 750ml', 'Atomizador repelente al polvo', 4, 4, 38.00, 65.00, 20, 5, 'PIEZA'),
('PROD-037', 'Escoba Cerda Suave', 'Para interiores sin rayar pisos', 4, 4, 50.00, 85.00, 15, 4, 'PIEZA'),
('PROD-038', 'Trapeador de Microfibra', 'Súper absorbente con bastón ligero', 4, 4, 65.00, 110.00, 18, 4, 'PIEZA'),
('PROD-039', 'Paquete Franelas Microfibra', '5 piezas multiusos 40x40 cm', 4, 4, 55.00, 95.00, 30, 8, 'PAQUETE'),
('PROD-040', 'Guantes de Nitrilo Talla M', 'Caja con 100 piezas desechables', 4, 4, 140.00, 220.00, 25, 5, 'CAJA'),

-- Herramientas y Ferretería (Categoría 5)
('PROD-041', 'Juego de Destornilladores', '6 piezas (planos y cruz) con mango de goma', 5, 4, 120.00, 199.00, 14, 3, 'PAQUETE'),
('PROD-042', 'Cinta Métrica 5m', 'Carcasa de alto impacto con freno', 5, 4, 45.00, 80.00, 30, 6, 'PIEZA'),
('PROD-043', 'Martillo de Uña 16oz', 'Mango de fibra de vidrio anti-vibración', 5, 4, 90.00, 155.00, 12, 3, 'PIEZA'),
('PROD-044', 'Pinzas de Presión 10"', 'Acero al cromo vanadio', 5, 4, 110.00, 185.00, 10, 2, 'PIEZA'),
('PROD-045', 'Cutter Profesional Navaja Ancha', 'Cuerpo metálico con bloqueo de seguridad', 5, 2, 35.00, 65.00, 40, 8, 'PIEZA'),
('PROD-046', 'Cinta Aislante Negra 18m', 'Paquete con 3 rollos de PVC', 5, 4, 30.00, 55.00, 50, 10, 'PAQUETE'),
('PROD-047', 'Multímetro Digital', 'Mide voltaje AC/DC, corriente y resistencia', 5, 1, 230.00, 390.00, 8, 2, 'PIEZA'),
('PROD-048', 'Taladro Inalámbrico 20V', 'Incluye 2 baterías y maletín de transporte', 5, 3, 1150.00, 1850.00, 6, 2, 'PIEZA'),
('PROD-049', 'Caja de Herramientas 16"', 'Plástico rígido con charola removible', 5, 4, 160.00, 270.00, 10, 3, 'PIEZA'),
('PROD-050', 'Lámpara Táctica LED', 'Recargable vía USB, 1000 lúmenes', 5, 3, 130.00, 220.00, 20, 4, 'PIEZA');
