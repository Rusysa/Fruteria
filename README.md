# PROYECTO RECREATIVO
Este proyecto no tiene ningun fin especifico y solo es una prueba de concepto, no represante un producto final funcional ni usable.


##  Frutería Veracruzana 

Proyecto web completo para una frutería con frontend, backend Node.js/Express, base de datos MySQL y panel de administrador.

---

## 📁 Estructura de Carpetas

```
fruteria-veracruzana/
├── backend/
│   ├── config/
│   │   └── db.js               # Configuración de conexión MySQL
│   ├── controllers/
│   │   ├── authController.js   # Lógica de autenticación
│   │   └── productController.js # CRUD de productos
│   ├── middleware/
│   │   └── authMiddleware.js   # Verificación de JWT
│   ├── models/                 # (Reservado para modelos futuros)
│   ├── routes/
│   │   ├── auth.js             # Rutas de autenticación
│   │   └── products.js         # Rutas de productos
│   ├── package.json
│   └── server.js               # Servidor principal Express
├── database/
│   └── database.sql            # Script SQL para crear la BD
├── frontend/
│   ├── admin/
│   │   ├── admin.css           # Estilos del panel admin
│   │   ├── admin.js            # Lógica del panel admin
│   │   └── index.html          # Panel de administrador
│   ├── css/
│   │   └── style.css           # Estilos del sitio principal
│   ├── images/                 # Imágenes del sitio
│   ├── js/
│   │   └── main.js             # JavaScript del sitio principal
│   └── index.html              # Página principal del sitio
└── README.md
```

---

## ⚙️ Requisitos Previos

- **Docker** → [docs.docker.com](https://docs.docker.com/get-docker/)
- **Docker Compose** → [docs.docker.com/compose](https://docs.docker.com/compose/install/)

---

## 🚀 Instrucciones de Instalación y Ejecución

### Paso 1: Iniciar los Servicios con Docker Compose

Desde la raíz del proyecto, ejecuta:

```bash
docker-compose up -d
```

Este comando iniciará automáticamente:
- **MariaDB** (base de datos) en puerto `3306`
- **Backend Node.js/Express** en puerto `3000`
- **Adminer** (gestor web de BD) en puerto `8080`

La base de datos se configurará automáticamente ejecutando el script `database/database.sql`.

### Paso 2: Verificar que los Servicios Estén Corriendo

```bash
docker-compose ps
```

Deberías ver 3 contenedores en estado **Up**.

### Paso 3: Abrir el Sitio Web

Abre tu navegador y visita:

| URL | Descripción |
|-----|-------------|
| `http://localhost:3000` | Sitio web principal |
| `http://localhost:3000/admin` | Panel de administrador |
| `http://localhost:8080` | Adminer (gestor de BD) |

### Detener los Servicios

```bash
docker-compose down
```

Para detener y eliminar volúmenes (datos de BD):

```bash
docker-compose down -v
```

---

## � Configuración de Docker

### Servicios Incluidos

El archivo `docker-compose.yml` define 3 servicios:

1. **MariaDB** (`db`)
   - Imagen: `mariadb`
   - Puerto: `3306`
   - Usuario root: `root`
   - Contraseña: `example`
   - Base de datos: `fruteria_veracruzana`
   - Volumen: `mariadb_data` (persistencia de datos)

2. **Backend Node.js** (`backend`)
   - Build desde: `backend/Dockerfile`
   - Puerto: `3000`
   - Variables de entorno configuradas automáticamente
   - Depende de: `db` (espera a que la BD esté lista)

3. **Adminer** (gestor web de BD)
   - Imagen: `adminer`
   - Puerto: `8080`
   - Permite gestionar la BD desde el navegador

### Variables de Entorno

Las variables están configuradas en `docker-compose.yml`:

```yaml
environment:
  DB_HOST: db          # Nombre del servicio en Docker
  DB_USER: root
  DB_PASSWORD: example
  DB_NAME: fruteria_veracruzana
```

---

## �🔐 Credenciales del Panel de Administrador

| Campo | Valor |
|-------|-------|
| Usuario | `admin` |
| Contraseña | `admin123` |

> **Nota:**  Para fines educativos se emplean credenciales genericas.

---

## 🌐 Endpoints de la API REST

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/api/auth/login` | Iniciar sesión (devuelve JWT) |

**Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

### Productos

| Método | Endpoint | Autenticación | Descripción |
|--------|----------|---------------|-------------|
| `GET` | `/api/products` | No | Obtener todos los productos |
| `GET` | `/api/products/:id` | No | Obtener un producto por ID |
| `POST` | `/api/products` | Sí (JWT) | Crear un nuevo producto |
| `PUT` | `/api/products/:id` | Sí (JWT) | Actualizar un producto |
| `DELETE` | `/api/products/:id` | Sí (JWT) | Eliminar un producto |

**Header para rutas protegidas:**
```
x-auth-token: <tu_token_jwt>
```

---

## 🎨 Características del Sitio

### Página Principal
- **Navbar** fijo con logo, menú de navegación y botón de acceso al admin
- **Hero Section** con imagen de fondo, título llamativo y estadísticas
- **Productos Destacados** cargados dinámicamente desde la API/BD
- **Categorías** con iconos y navegación
- **Sobre Nosotros** con historia y valores de la empresa
- **Contacto** con información de ubicación, teléfono y formulario
- **Footer** con redes sociales y enlaces

### Panel de Administrador
- **Login seguro** con JWT
- **Dashboard** con estadísticas generales
- **CRUD completo** de productos (crear, leer, actualizar, eliminar)
- **Gestión de categorías**
- **Modo Demo** (funciona sin conexión a BD)

---

## 🛠️ Tecnologías Utilizadas

| Capa | Tecnología |
|------|-----------|
| Frontend | HTML5, CSS3, JavaScript (Vanilla) |
| Backend | Node.js, Express.js |
| Base de Datos | MySQL |
| Autenticación | JWT (JSON Web Tokens) |
| Seguridad | bcryptjs (hash de contraseñas) |

---

## � Solución de Problemas

### Ver logs de los contenedores

```bash
# Logs de todos los servicios
docker-compose logs

# Logs de un servicio específico
docker-compose logs backend
docker-compose logs db

# Seguir los logs en tiempo real
docker-compose logs -f backend
```

### Reiniciar un servicio

```bash
docker-compose restart backend
docker-compose restart db
```

### Reconstruir la imagen del backend después de cambios

```bash
docker-compose up -d --build backend
```

### Acceder a la terminal del contenedor

```bash
docker-compose exec backend bash
docker-compose exec db bash
```

---

## �📝 Notas Importantes

1. El sitio incluye **modo demo**: si el servidor no está disponible, carga productos de ejemplo estáticos.
2. Con Docker, todos los servicios están aislados en contenedores. **No necesitas instalar MySQL o Node.js** en tu máquina.
3. Los datos de la base de datos se persisten en el volumen `mariadb_data`. Si necesitas resetear la BD, ejecuta `docker-compose down -v`.
4. La BD se inicializa automáticamente con el script `database/database.sql` cuando levanta `docker-compose up`.
5. Para cambios en el código del backend, reinicia el contenedor con `docker-compose restart backend` o reconstruye con `docker-compose up -d --build backend`.

---

*Desarrollado con ❤️ para la Frutería Veracruzana — Xalapa, Veracruz, México*
