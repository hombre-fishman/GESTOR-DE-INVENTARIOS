INSERT INTO public.productos 
(codigo, nombre, descripcion, categoria_id, proveedor_id, precio_compra, precio_venta, stock, stock_minimo, unidad) 
VALUES

-- Electrónica (Categoría 1)
('PROD-051', 'Soporte Ajustable para Laptop', 'Aluminio plegable ergonómico', 1, 1, 210.00, 380.00, 22, 5, 'PIEZA'),
('PROD-052', 'Bocina Bluetooth Portátil', 'Resistente al agua IPX7 10W', 1, 3, 380.00, 650.00, 16, 4, 'PIEZA'),
('PROD-053', 'Barra de Sonido TV', 'Entrada óptica y Bluetooth con Subwoofer', 1, 1, 1100.00, 1790.00, 8, 2, 'PIEZA'),
('PROD-054', 'Camara de Seguridad Wi-Fi', 'Visión nocturna y audio bidireccional 1080p', 1, 4, 320.00, 550.00, 15, 3, 'PIEZA'),
('PROD-055', 'Lector de Tarjetas SD/TF', 'Conexión USB 3.0 y Type-C', 1, 2, 75.00, 140.00, 35, 8, 'PIEZA'),
('PROD-056', 'Tapete para Mouse XXL', 'Superficie de tela antiderrapante 90x40cm', 1, 2, 110.00, 210.00, 28, 6, 'PIEZA'),
('PROD-057', 'Filtro Privacidad Monitor 24"', 'Antirreflejo y protección de ángulo 60°', 1, 1, 290.00, 480.00, 10, 3, 'PIEZA'),
('PROD-058', 'Adaptador DisplayPort a HDMI', 'Soporta 1080p y 4K a 30Hz', 1, 3, 65.00, 125.00, 40, 8, 'PIEZA'),
('PROD-059', 'Micrófono Condensador USB', 'Con tripie y filtro pop para podcast', 1, 1, 420.00, 720.00, 12, 3, 'PIEZA'),
('PROD-060', 'Regleta Multicontacto 6 Tomas', 'Protección contra sobretensiones y 2 USB', 1, 4, 160.00, 290.00, 25, 5, 'PIEZA'),

-- Papelería y Oficina (Categoría 2)
('PROD-061', 'Carpeta de Argollas 2"', 'Presentación panorámica tamaño carta', 2, 2, 55.00, 95.00, 30, 8, 'PIEZA'),
('PROD-062', 'Paquete Notas Adhesivas 76x76mm', 'Block de 400 hojas colores pastel', 2, 2, 30.00, 60.00, 60, 15, 'PAQUETE'),
('PROD-063', 'Perforadora de 3 Orificios', 'Capacidad para 12 hojas de metal', 2, 2, 95.00, 165.00, 14, 4, 'PIEZA'),
('PROD-064', 'Destructora de Documentos', 'Corte cruzado capacidad 6 hojas', 2, 1, 680.00, 1150.00, 6, 2, 'PIEZA'),
('PROD-065', 'Cinta Embalaje Transparente 48mm', 'Paquete con 6 rollos de 50m', 2, 4, 70.00, 120.00, 35, 10, 'PAQUETE'),
('PROD-066', 'Sacapuntas Eléctrico', 'Alimentación USB/Baterías alto flujo', 2, 2, 140.00, 240.00, 18, 4, 'PIEZA'),
('PROD-067', 'Paquete Clips Metálicos #2', 'Caja con 100 piezas niquelados', 2, 2, 12.00, 25.00, 100, 20, 'CAJA'),
('PROD-068', 'Despachador de Cinta de Escritorio', 'Base pesada antideslizante', 2, 2, 45.00, 85.00, 25, 5, 'PIEZA'),
('PROD-069', 'Lámpara de Escritorio LED', '3 modos de luz y brazo flexible USB', 2, 1, 180.00, 320.00, 15, 4, 'PIEZA'),
('PROD-070', 'Lápices de Color Profesionales', 'Caja metálica con 24 piezas', 2, 2, 120.00, 210.00, 20, 5, 'CAJA'),

-- Abarrotes y Alimentos (Categoría 3)
('PROD-071', 'Avena en Hojuelas 1kg', 'Grano entero alto en fibra', 3, 5, 32.00, 52.00, 45, 10, 'PIEZA'),
('PROD-072', 'Aceite vegetal Comestible 1L', '100% puro de soya', 3, 5, 38.00, 58.00, 60, 15, 'PIEZA'),
('PROD-073', 'Mermelada de Fresa 450g', 'Con trozos de fruta natural', 3, 5, 35.00, 56.00, 30, 8, 'PIEZA'),
('PROD-074', 'Cereal de Trigo Integral 500g', 'Enriquecido con vitaminas y minerales', 3, 5, 48.00, 75.00, 25, 6, 'PIEZA'),
('PROD-075', 'Atún en Agua 140g', 'Lomo de atún aleta amarilla (Caja 12 uds)', 3, 5, 180.00, 270.00, 15, 4, 'CAJA'),
('PROD-076', 'Miel de Abeja Orgánica 500g', '100% pura de floración multifloral', 3, 5, 75.00, 125.00, 20, 5, 'PIEZA'),
('PROD-077', 'Agua Saborizada 600ml', 'Paquete con 12 botellas surtidas', 3, 5, 90.00, 145.00, 22, 5, 'PAQUETE'),
('PROD-078', 'Galletas Saladas 400g', 'Paquete familiar 4 sobres internos', 3, 5, 28.00, 45.00, 35, 10, 'PAQUETE'),
('PROD-079', 'Barra de Chocolate Amargo 70%', 'Tableta de repostería/consumo 100g', 3, 5, 30.00, 50.00, 40, 10, 'PIEZA'),
('PROD-080', 'Jarabe de Maple Puro 250ml', 'Para hot cakes y repostería', 3, 5, 95.00, 155.00, 12, 3, 'PIEZA'),

-- Limpieza y Hogar (Categoría 4)
('PROD-081', 'Cloro Concentrado 4L', 'Desinfectante y blanqueador multiusos', 4, 4, 42.00, 70.00, 30, 8, 'PIEZA'),
('PROD-082', 'Suavizante de Telas 3L', 'Aroma fresco de larga duración', 4, 4, 75.00, 125.00, 25, 6, 'PIEZA'),
('PROD-083', 'Lavavajillas Líquido 1.2L', 'Poder arrancagrasa aroma limón', 4, 4, 40.00, 68.00, 35, 8, 'PIEZA'),
('PROD-084', 'Esponjas para Trastes', 'Paquete con 12 piezas de doble fibra', 4, 4, 30.00, 55.00, 50, 12, 'PAQUETE'),
('PROD-085', 'Bolsas de Basura Uso Rudo 90L', 'Paquete con 30 piezas con jareta', 4, 4, 85.00, 140.00, 28, 6, 'PAQUETE'),
('PROD-086', 'Aromatizante Ambiental en Gel', 'Aroma lavanda 200g', 4, 4, 25.00, 45.00, 40, 10, 'PIEZA'),
('PROD-087', 'Pastillas Deodorantes Inodoro', 'Caja con 4 tabletas desinfectantes', 4, 4, 32.00, 58.00, 30, 8, 'CAJA'),
('PROD-088', 'Cepillo para Tallar Pisos', 'Base de plástico con cerdas duras', 4, 4, 35.00, 62.00, 20, 5, 'PIEZA'),
('PROD-089', 'Cubeta de Plástico 12L', 'Con labio vertedor y asa metálica', 4, 4, 45.00, 80.00, 18, 4, 'PIEZA'),
('PROD-090', 'Fibra Metálica Inoxidable', 'Paquete con 6 piezas para cochambre', 4, 4, 28.00, 48.00, 45, 10, 'PAQUETE'),

-- Herramientas y Ferretería (Categoría 5)
('PROD-091', 'Nivel de Gota de Aluminio 24"', '3 gotas para ángulos 45°, 90° y 180°', 5, 4, 110.00, 185.00, 12, 3, 'PIEZA'),
('PROD-092', 'Llave Ajustable (Perica) 10"', 'Acero forjado con apertura hasta 1-1/8"', 5, 4, 125.00, 210.00, 15, 4, 'PIEZA'),
('PROD-093', 'Juego de Brocas para Concreto', 'Set de 5 piezas (3/16" a 3/8")', 5, 4, 75.00, 130.00, 22, 5, 'PAQUETE'),
('PROD-094', 'Flexómetro Digital 40m', 'Medidor láser de distancia con pantalla', 5, 1, 380.00, 620.00, 9, 2, 'PIEZA'),
('PROD-095', 'Pistola para Silicona', 'Cuerpo reforzado para cartuchos estándar', 5, 4, 50.00, 90.00, 25, 5, 'PIEZA'),
('PROD-096', 'Cartucho de Silicona Transparente', 'Tubo de 300ml multiusos', 5, 4, 42.00, 75.00, 40, 10, 'PIEZA'),
('PROD-097', 'Organizador de Tornillos 12 Cajones', 'Caja de plástico transparente apilable', 5, 4, 140.00, 235.00, 14, 3, 'PIEZA'),
('PROD-098', 'Juego de Llaves Allen Metricas', '9 piezas tipo navaja con bola terminal', 5, 4, 85.00, 145.00, 20, 5, 'PAQUETE'),
('PROD-099', 'Guantes de Trabajo Uso Rudo', 'Cuero sintético con refuerzo en palma', 5, 4, 70.00, 120.00, 30, 6, 'PAQUETE'),
('PROD-100', 'Extension Eléctrica 10m', 'Calibre 16 uso doméstico 3 contactos', 5, 4, 160.00, 260.00, 16, 4, 'PIEZA');