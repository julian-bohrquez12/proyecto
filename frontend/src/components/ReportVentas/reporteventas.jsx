import { useState, useEffect } from "react";
import axios from "axios";
import "./reporteventas.css";

// ✅ Importamos las imágenes correctamente desde src/assets/
import LogoEmpren from "../../assets/Logo_Empren.png";
import Cuaderno from "../../assets/Cuaderno_nuevo.png";
import Esfero from "../../assets/Esfero.png";
import Borrador from "../../assets/Borrador_nuevo.png";
import QR from "../../assets/Codigo_QR.png";
import Efectivo from "../../assets/Efectivo.png";
import Datafono from "../../assets/Datafono.png";

function ReporteVentas() {
  const [modalData, setModalData] = useState(null);
  const [productos, setProductos] = useState([]);
  const [metodosPago, setMetodosPago] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/ventas/productos")
      .then((res) => setProductos(res.data))
      .catch((err) => console.error("Error cargando productos:", err));

    axios
      .get("http://localhost:4000/ventas/metodos-pago")
      .then((res) => setMetodosPago(res.data))
      .catch((err) => console.error("Error cargando métodos de pago:", err));
  }, []);

  const abrirModal = (producto) => {
    setModalData(producto);
  };

  const cerrarModal = () => {
    setModalData(null);
  };

  return (
    <div>
      {/* Barra superior */}
      <header className="barra-superior">
        <img src={LogoEmpren} alt="Logo" className="logoem" />
      </header>

      {/* Menú lateral */}
      <label>
        <input className="lineas-check" type="checkbox" />
        <div className="Lineas">
          <span className="top_line common"></span>
          <span className="middle_line common"></span>
          <span className="bottom_line common"></span>
        </div>

        <div className="Menu">
          <h1 className="menu_titulo">Menú</h1>
          <ul>
            <li><a href="http://localhost:5173/usuarios"><i className="fas fa-user"></i>Usuarios</a></li>
            <li><a href="http://localhost:5173/registroinventario"><i className="fas fa-clipboard-list"></i>Inventario</a></li>
            <li><a href="#"><i className="fas fa-cart-plus"></i>Registro De Ventas</a></li>
            <li><a href="http://localhost:5173/reporteventas"><i className="fas fa-chart-line"></i>Reporte De Ventas</a></li>
            <li><a href="http://localhost:5173/registrogastos"><i className="fas fa-wallet"></i>Registro De Gastos</a></li>
            <li><a href="http://localhost:5173/reportegastos"><i className="fas fa-file-invoice-dollar"></i>Reporte De Gastos</a></li>
            <li><a href="http://localhost:5173/menureporte"><i className="fas fa-dollar-sign"></i>Reporte De Ganancias</a></li>
            <li><a href="http://localhost:5173/ajustes"><i className="fas fa-cogs"></i>Ajustes</a></li>
          </ul>
        </div>
      </label>

      {/* Título */}
      <h1 className="Titulo">Reporte Ventas</h1>
      <hr />

      {/* Productos */}
      <h1 className="Titulo">Productos:</h1>
      <div className="products">
        {productos.length > 0 ? (
          productos.map((prod, index) => (
            <button
              key={index}
              className="product-btn"
              onClick={() =>
                abrirModal({
                  producto: prod.Nombre,
                  precio: prod.Precio,
                  cantidad: prod.Cantidad,
                  fecha: prod.Fecha || "Sin fecha",
                  imagen: prod.Imagen || Cuaderno, // imagen por defecto
                })
              }
            >
              <img
                src={prod.Imagen || Cuaderno}
                alt={prod.Nombre}
              />
            </button>
          ))
        ) : (
          <>
            {/* 🔹 Bloque estático de productos */}
            <button
              className="product-btn"
              onClick={() =>
                abrirModal({
                  producto: "Cuaderno",
                  precio: "3.000",
                  cantidad: "15",
                  fecha: "18/04/2025",
                  imagen: Cuaderno,
                })
              }
            >
              <img src={Cuaderno} alt="Cuaderno" />
            </button>

            <button
              className="product-btn"
              onClick={() =>
                abrirModal({
                  producto: "Esfero",
                  precio: "1.500",
                  cantidad: "10",
                  fecha: "18/04/2025",
                  imagen: Esfero,
                })
              }
            >
              <img src={Esfero} alt="Esfero" />
            </button>

            <button
              className="product-btn"
              onClick={() =>
                abrirModal({
                  producto: "Borrador",
                  precio: "500",
                  cantidad: "8",
                  fecha: "18/04/2025",
                  imagen: Borrador,
                })
              }
            >
              <img src={Borrador} alt="Borrador" />
            </button>
          </>
        )}
      </div>

      {/* Modal */}
      {modalData && (
        <div className="modal" onClick={cerrarModal}>
          <div
            className="modal-contenido"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="cerrar" onClick={cerrarModal}>
              &times;
            </span>

            <h2>{modalData.producto}</h2>
            <p><strong>Precio:</strong> {modalData.precio}</p>
            <p><strong>Cantidad comprada:</strong> {modalData.cantidad}</p>
            <p><strong>Fecha:</strong> {modalData.fecha}</p>
            <img
              src={modalData.imagen}
              alt={modalData.producto}
              className="img-modal"
            />
          </div>
        </div>
      )}

      {/* Métodos de pago */}
      <h2 className="subtitle">Método de pago:</h2>
      <div className="payments">
        {metodosPago.length > 0 ? (
          metodosPago.map((metodo, index) => (
            <button key={index} className="pay-btn">
              <img
                src={metodo.Icono || QR}
                alt={metodo.Nombre}
                className="icono-pago"
              />
              {metodo.Nombre || "Método"}
            </button>
          ))
        ) : (
          <>
            {/* 🔹 Bloque estático por defecto */}
            <button className="pay-btn">
              <img src={QR} alt="QR" className="icono-pago" />
              QR
            </button>
            <button className="pay-btn">
              <img src={Efectivo} alt="Efectivo" className="icono-pago" />
              Efectivo
            </button>
            <button className="pay-btn">
              <img src={Datafono} alt="Datáfono" className="icono-pago" />
              Datáfono
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ReporteVentas;
