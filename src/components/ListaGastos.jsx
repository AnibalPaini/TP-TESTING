import { useState, useEffect } from "react";
import { obtenerGastos, eliminarGasto } from "../services";
import "./ListaGastos.css";

function ListaGastos({ refresh }) {
  const [gastos, setGastos] = useState([]);

  const cargarGastos = () => {
    const data = obtenerGastos();
    setGastos(data);
  };

  useEffect(() => {
    cargarGastos();
  }, [refresh]);

  const handleEliminar = (id) => {
    if (window.confirm("¿Estás seguro de eliminar este gasto?")) {
      eliminarGasto(id);
      cargarGastos();
    }
  };

  const total = gastos.reduce((sum, gasto) => sum + (gasto.monto || 0), 0);

  return (
    <div className="lista-gastos">
      <h2>Lista de Gastos</h2>
      {gastos.length === 0 ? (
        <p>No hay gastos registrados</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Monto</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {gastos.map((gasto) => (
                <tr key={gasto.id}>
                  <td>{gasto.descripcion}</td>
                  <td>${gasto.monto?.toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => handleEliminar(gasto.id)}
                      className="btn-eliminar"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="total">
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
        </>
      )}
    </div>
  );
}

export default ListaGastos;
