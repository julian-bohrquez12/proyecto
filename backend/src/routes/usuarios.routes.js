// routes/usuarios.js
import express from "express";
import { pool } from "../db.js";
import multer from "multer";

const router = express.Router();

// Configuración para subir imágenes con multer
const upload = multer({ storage: multer.memoryStorage() });

// ✅ POST /usuarios/editar
// Actualiza la información del usuario
router.post("/editar", upload.single("imagen"), async (req, res) => {
  try {
    const { usuario, nombre, apellido, correo } = req.body;

    // Si el usuario envió una imagen
    if (req.file) {
      // Aquí podrías guardarla en disco o en base64
      const imagenBuffer = req.file.buffer.toString("base64");

      await pool.query(
        "UPDATE usuarios SET nombre=?, apellido=?, correo=?, imagen=? WHERE usuario=?",
        [nombre, apellido, correo, imagenBuffer, usuario]
      );
    } else {
      // Si no cambió la imagen
      await pool.query(
        "UPDATE usuarios SET nombre=?, apellido=?, correo=? WHERE usuario=?",
        [nombre, apellido, correo, usuario]
      );
    }

    res.json({ message: "Perfil actualizado correctamente" });
  } catch (err) {
    console.error("Error al editar usuario:", err);
    res.status(500).json({ error: "Error al editar usuario" });
  }
});

// ✅ DELETE /usuarios/eliminar
// Elimina un usuario según su nombre de usuario
router.delete("/eliminar", async (req, res) => {
  try {
    const { usuario } = req.body;
    await pool.query("DELETE FROM usuarios WHERE usuario = ?", [usuario]);
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (err) {
    console.error("Error al eliminar usuario:", err);
    res.status(500).json({ error: "Error al eliminar usuario" });
  }
});

// ✅ (Opcional) GET /usuarios/:usuario
// Obtiene la información de un usuario (si la necesitas)
router.get("/:usuario", async (req, res) => {
  try {
    const { usuario } = req.params;
    const [rows] = await pool.query("SELECT * FROM usuarios WHERE usuario = ?", [usuario]);
    if (rows.length === 0) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(rows[0]);
  } catch (err) {
    console.error("Error al obtener usuario:", err);
    res.status(500).json({ error: "Error al obtener usuario" });
  }
});

export default router;
