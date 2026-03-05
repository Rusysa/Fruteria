const express = require('express');
const cors = require('cors');
const path = require('path');

const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Rutas de la API
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Ruta para el panel de admin
app.get('/admin', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/admin/index.html'));
});

// Ruta principal para servir el index.html del frontend
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, '127.0.0.1', () => {
    console.log(`Servidor corriendo en http://127.0.0.1:${PORT}`);
});
