const jwt = require("jsonwebtoken");
const JWT_SECRET = "tu_super_secreto_jwt";

module.exports = function(req, res, next) {
    const token = req.header("x-auth-token");

    if (!token) {
        return res.status(401).json({ msg: "No hay token, permiso no válido" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: "Token no es válido" });
    }
};
