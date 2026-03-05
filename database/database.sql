-- ============================================================
-- FRUTERÍA VERACRUZANA - Script de Base de Datos
-- ============================================================

-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS fruteria_veracruzana
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE fruteria_veracruzana;

-- ============================================================
-- TABLA: products
-- ============================================================
CREATE TABLE IF NOT EXISTS `products` (
  `id`           INT AUTO_INCREMENT PRIMARY KEY,
  `name`         VARCHAR(255)    NOT NULL,
  `description`  TEXT            NOT NULL,
  `price_per_kg` DECIMAL(10, 2)  NOT NULL,
  `image_url`    VARCHAR(255)    NOT NULL DEFAULT 'images/hero-bg.jpg',
  `category`     VARCHAR(100)    NOT NULL DEFAULT 'General',
  `created_at`   TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,
  `updated_at`   TIMESTAMP       DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- TABLA: users
-- ============================================================
CREATE TABLE IF NOT EXISTS `users` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `username`   VARCHAR(255) NOT NULL UNIQUE,
  `password`   VARCHAR(255) NOT NULL,
  `role`       ENUM('admin', 'editor') DEFAULT 'admin',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- DATOS INICIALES: Productos
-- ============================================================
INSERT INTO `products` (`name`, `description`, `price_per_kg`, `image_url`, `category`) VALUES
('Mango Ataulfo',
 'El rey de los mangos veracruzanos. Dulce, jugoso y sin fibra, con un sabor tropical inigualable. Cosechado en su punto óptimo de madurez.',
 35.50, 'images/mango.jpg', 'Frutas Tropicales'),

('Papaya Maradol',
 'Papaya grande y de pulpa anaranjada, rica en vitaminas A, C y antioxidantes. Perfecta para el desayuno o licuados nutritivos.',
 25.00, 'images/papaya.jpg', 'Frutas Tropicales'),

('Guayaba Criolla',
 'Guayaba fresca y aromática, con alto contenido de vitamina C. Ideal para jugos, mermeladas, postres y consumo directo.',
 28.75, 'images/guayaba.jpg', 'Frutas Tropicales'),

('Piña Miel',
 'Piña extra dulce y jugosa, con bajo nivel de acidez. Perfecta para el calor veracruzano, en jugos, aguas frescas o sola.',
 22.00, 'images/frutas-mexico.jpg', 'Frutas Tropicales'),

('Naranja Valencia',
 'Naranja jugosa y dulce, ideal para hacer el mejor jugo fresco. Alta en vitamina C y antioxidantes naturales.',
 18.00, 'images/hero-bg.jpg', 'Cítricos'),

('Plátano Tabasco',
 'Plátano cremoso y dulce, cultivado en las fértiles tierras veracruzanas. Fuente natural de potasio y energía.',
 15.50, 'images/frutas-mexico.jpg', 'Plátanos'),

('Sandía Sin Semilla',
 'Sandía grande, roja y refrescante. Sin semillas para mayor comodidad. Perfecta para el verano veracruzano.',
 12.00, 'images/hero-bg.jpg', 'Uvas y Melones'),

('Fresa Fresca',
 'Fresas frescas y brillantes, perfectas para postres, smoothies y decoración. Seleccionadas en su punto de madurez ideal.',
 85.00, 'images/frutas-mexico.jpg', 'Berries');

-- ============================================================
-- DATOS INICIALES: Usuario Administrador
-- Contraseña: admin123
-- Hash generado con bcryptjs (saltRounds: 10)
-- Para regenerar: const hash = await bcrypt.hash('admin123', 10);
-- ============================================================
INSERT INTO `users` (`username`, `password`, `role`) VALUES
('admin', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin');

-- ============================================================
-- VERIFICACIÓN
-- ============================================================
SELECT 'Base de datos creada exitosamente' AS status;
SELECT COUNT(*) AS total_productos FROM products;
SELECT COUNT(*) AS total_usuarios FROM users;
