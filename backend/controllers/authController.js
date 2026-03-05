const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ¡Asegúrate de tener una clave secreta más segura en un entorno de producción!
const JWT_SECRET = "tu_super_secreto_jwt";

exports.login = (req, res) => {
  const { username, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        res.status(500).send("Error en el servidor");
        throw err;
      }

      if (results.length === 0) {
        return res.status(401).send("Usuario o contraseña incorrectos");
      }

      const user = results[0];

      console.log("--- DEBUG LOGIN ---");
      console.log("Password enviada:", password);
      console.log("Hash en DB:", user.password);
      console.log("Longitud del Hash en DB:", user.password.length); // Debería ser 60

      // Comparar la contraseña hasheada
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          res.status(500).send("Error al comparar contraseñas");
          throw err;
        }

        if (isMatch) {
          // Crear y firmar el token
          const token = jwt.sign(
            { id: user.id, username: user.username },
            JWT_SECRET,
            { expiresIn: "1h" },
          );
          res.json({ token });
        } else {
          res.status(401).send("Usuario o contraseña incorrectos");
        }
      });
    },
  );
};
