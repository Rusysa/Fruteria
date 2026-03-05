# 🍊 Frutería Veracruzana — Proyecto Completo

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

- **Node.js** v16 o superior → [nodejs.org](https://nodejs.org)
- **MySQL** v8 o superior → [mysql.com](https://mysql.com)
- **npm** (incluido con Node.js)

---

## 🚀 Instrucciones de Instalación y Ejecución

### Paso 1: Configurar la Base de Datos MySQL

1. Abre tu cliente MySQL (MySQL Workbench, phpMyAdmin, o la terminal):

```bash
mysql -u root -p
```

2. Ejecuta el script SQL:

```bash
mysql -u root -p < database/database.sql
```

O copia y pega el contenido de `database/database.sql` en tu cliente MySQL.

Esto creará:
- La base de datos `fruteria_veracruzana`
- La tabla `products` con 4 productos de ejemplo
- La tabla `users` con el usuario administrador

### Paso 2: Configurar la Conexión a la Base de Datos

Abre el archivo `backend/config/db.js` y ajusta las credenciales según tu configuración local:

```javascript
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',       // Tu usuario de MySQL
  password: '',       // Tu contraseña de MySQL
  database: 'fruteria_veracruzana'
});
```

### Paso 3: Instalar Dependencias del Backend

```bash
cd backend
npm install
```

### Paso 4: Iniciar el Servidor

```bash
npm start
```

O en modo desarrollo (con recarga automática):

```bash
npm run dev
```

El servidor se iniciará en: **http://127.0.0.1:3000**

### Paso 5: Abrir el Sitio Web

Abre tu navegador y visita:

| URL | Descripción |
|-----|-------------|
| `http://127.0.0.1:3000` | Sitio web principal |
| `http://127.0.0.1:3000/admin` | Panel de administrador |

---

## 🔐 Credenciales del Panel de Administrador

| Campo | Valor |
|-------|-------|
| Usuario | `admin` |
| Contraseña | `admin123` |

> **Nota:** En producción, cambia estas credenciales y la clave secreta JWT en `authController.js`.

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

## 📝 Notas Importantes

1. El sitio incluye **modo demo**: si el servidor no está disponible, carga productos de ejemplo estáticos.
2. Para producción, usa variables de entorno para las credenciales sensibles.
3. El hash bcrypt en el SQL puede necesitar regenerarse. Para crear un nuevo hash:

```javascript
const bcrypt = require('bcryptjs');
const hash = await bcrypt.hash('admin123', 10);
console.log(hash);
```

Luego actualiza el INSERT en `database.sql`.

---

*Desarrollado con ❤️ para la Frutería Veracruzana — Xalapa, Veracruz, México*
