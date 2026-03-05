-- ============================================================
-- FRUTERÍA VERACRUZANA - Script de Base de Datos (MariaDB Compatible)
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
  -- Ajuste para MariaDB: Usamos NULL en lugar de NOT NULL para evitar conflictos de inicialización
  `created_at`   TIMESTAMP       NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at`   TIMESTAMP       NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- TABLA: users
-- ============================================================
CREATE TABLE IF NOT EXISTS `users` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `username`   VARCHAR(255) NOT NULL UNIQUE,
  `password`   VARCHAR(255) NOT NULL,
  `role`       ENUM('admin', 'editor') DEFAULT 'admin',
  `created_at` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- DATOS INICIALES: Productos
-- ============================================================
INSERT INTO `products` (`name`, `description`, `price_per_kg`, `image_url`, `category`) VALUES
('Mango Ataulfo', 'El rey de los mangos veracruzanos. Dulce, jugoso y sin fibra...', 35.50, 'images/mango.jpg', 'Frutas Tropicales'),
('Papaya Maradol', 'Papaya grande y de pulpa anaranjada, rica en vitaminas...', 25.00, 'images/papaya.jpg', 'Frutas Tropicales'),
('Guayaba Criolla', 'Guayaba fresca y aromática, con alto contenido de vitamina C...', 28.75, 'images/guayaba.jpg', 'Frutas Tropicales'),
('Piña Miel', 'Piña extra dulce y jugosa, con bajo nivel de acidez...', 22.00, 'images/frutas-mexico.jpg', 'Frutas Tropicales'),
('Naranja Valencia', 'Naranja jugosa y dulce, ideal para hacer el mejor jugo fresco...', 18.00, 'images/hero-bg.jpg', 'Cítricos'),
('Plátano Tabasco', 'Plátano cremoso y dulce, cultivado en tierras veracruzanas...', 15.50, 'images/frutas-mexico.jpg', 'Plátanos'),
('Sandía Sin Semilla', 'Sandía grande, roja y refrescante. Sin semillas.', 12.00, 'images/hero-bg.jpg', 'Uvas y Melones'),
('Fresa Fresca', 'Fresas frescas y brillantes, perfectas para postres.', 85.00, 'images/frutas-mexico.jpg', 'Berries');

-- ============================================================
-- DATOS INICIALES: Usuario Administrador
-- ============================================================
INSERT INTO `users` (`username`, `password`, `role`) VALUES
('admin', '$2a$10$BM82TseuXId56ufSNGUIP.6o4ZGOSAUm.nZgX5xxtbs8bIuik2iYq', 'admin');

-- ============================================================
-- VERIFICACIÓN
-- ============================================================
SELECT 'Base de datos lista' AS status;
SELECT COUNT(*) AS total_productos FROM products;
SELECT COUNT(*) AS total_usuarios FROM users;
