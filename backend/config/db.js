const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'db', // Nombre del servicio de la base de datos en Docker Compose
  user: 'root', // Usuario por defecto de MySQL en muchos entornos locales
  password: 'example', // Contraseña por defecto (vacía)
  database: 'fruteria_veracruzana'
});

connection.connect(error => {
  if (error) throw error;
  console.log('Conexión a la base de datos establecida.');
});

module.exports = connection;
