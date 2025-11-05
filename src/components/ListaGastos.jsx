import { useState, useEffect } from "react";
import { obtenerData, eliminarGasto } from "../services";
import "./ListaGastos.css";

function ListaGastos({ refresh }) {
  const [gastos, setGastos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarGastos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await obtenerData();

      if (data && data.docs) {
        const gastosArray = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGastos(gastosArray);
      } else {
        setGastos([]);
      }
    } catch (err) {
      console.error("Error al cargar gastos:", err);
      setError(
        "Error al cargar los gastos. Verifica los permisos de Firebase."
      );
      setGastos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarGastos();
  }, [refresh]);

  const handleEliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este gasto?")) {
      try {
        await eliminarGasto(id);
        cargarGastos();
      } catch (err) {
        console.error("Error al eliminar:", err);
        alert("Error al eliminar el gasto");
      }
    }
  };

  if (loading) {
    return <div className="loading">Cargando gastos...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

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
