import React, { useState } from "react";
import "./Form.css";

const Form = ({ onAdd }) => {
  const [nombre, setNombre] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() === "" || cantidad <= 0 || precio <= 0) {
      setError("Por favor, completa todos los campos correctamente.");
      return;
    }
    const gasto = {
      fecha: new Date().toLocaleDateString(),
      nombre,
      cantidad: Number(cantidad),
      precio: Number(precio),
    };

    onAdd(gasto);
    setError("");

    setNombre("");
    setCantidad(0);
    setPrecio(0);
  };

  return (
    <form className="fg-form" data-testid="form" onSubmit={handleSubmit} noValidate>
      <div className="fg-row">
        <label className="fg-label" htmlFor="nombre">
          Nombre
        </label>
        <input
          id="nombre"
          className="fg-input"
          type="text"
          placeholder="Ej. Pan"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          aria-label="Nombre del gasto"
        />
      </div>

      <div className="fg-row fg-row--small">
        <label className="fg-label" htmlFor="cantidad">
          Cantidad
        </label>
        <input
          id="cantidad"
          className="fg-input fg-input--number"
          type="number"
          placeholder="0"
          min="0"
          step="1"
          value={cantidad}
          onChange={(e) => setCantidad(Number(e.target.value))}
          aria-label="Cantidad"
        />
      </div>

      <div className="fg-row fg-row--small">
        <label className="fg-label" htmlFor="precio">
          Precio
        </label>
        <input
          id="precio"
          className="fg-input fg-input--number"
          type="number"
          placeholder="0.00"
          min="0"
          step="0.01"
          value={precio}
          onChange={(e) => setPrecio(Number(e.target.value))}
          aria-label="Precio"
        />
      </div>

      <div className="fg-actions">
        <button className="fg-button" type="submit">
          Agregar
        </button>
      </div>
      {error && (
        <p className="fg-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
};

export default Form;
