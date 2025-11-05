import { useState } from "react";
import { agregarGasto } from "../services";
import "./Form.css";

function Form({ onGastoAgregado }) {
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!descripcion.trim() || !monto) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    setError(null);

    const nuevoGasto = {
      descripcion: descripcion.trim(),
      monto: parseFloat(monto),
      fecha: new Date().toISOString(),
    };

    agregarGasto(nuevoGasto);

    setDescripcion("");
    setMonto("");

    if (onGastoAgregado) {
      onGastoAgregado();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-gastos">
      <div className="form-group">
        <label htmlFor="descripcion">Descripción:</label>
        <input
          type="text"
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Ej: Compra supermercado"
        />
      </div>

      <div className="form-group">
        <label htmlFor="monto">Monto:</label>
        <input
          type="number"
          id="monto"
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          placeholder="0.00"
          step="0.01"
        />
      </div>

      <button type="submit">Agregar Gasto</button>

      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default Form;
