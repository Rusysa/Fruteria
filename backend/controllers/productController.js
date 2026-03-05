
const db = require("../config/db");

exports.getAllProducts = (req, res) => {
    db.query("SELECT * FROM products", (err, results) => {
        if (err) {
            res.status(500).send("Error al obtener los productos");
            throw err;
        }
        res.json(results);
    });
};

exports.getProductById = (req, res) => {
    db.query("SELECT * FROM products WHERE id = ?", [req.params.id], (err, results) => {
        if (err) {
            res.status(500).send("Error al obtener el producto");
            throw err;
        }
        res.json(results[0]);
    });
};

exports.createProduct = (req, res) => {
    const { name, description, price_per_kg, image_url, category } = req.body;
    db.query("INSERT INTO products (name, description, price_per_kg, image_url, category) VALUES (?, ?, ?, ?, ?)", 
             [name, description, price_per_kg, image_url, category], (err, results) => {
        if (err) {
            res.status(500).send("Error al crear el producto");
            throw err;
        }
        res.status(201).send(`Producto creado con ID: ${results.insertId}`);
    });
};

exports.updateProduct = (req, res) => {
    const { name, description, price_per_kg, image_url, category } = req.body;
    db.query("UPDATE products SET name = ?, description = ?, price_per_kg = ?, image_url = ?, category = ? WHERE id = ?", 
             [name, description, price_per_kg, image_url, category, req.params.id], (err, results) => {
        if (err) {
            res.status(500).send("Error al actualizar el producto");
            throw err;
        }
        res.send("Producto actualizado");
    });
};

exports.deleteProduct = (req, res) => {
    db.query("DELETE FROM products WHERE id = ?", [req.params.id], (err, results) => {
        if (err) {
            res.status(500).send("Error al eliminar el producto");
            throw err;
        }
        res.send("Producto eliminado");
    });
};
