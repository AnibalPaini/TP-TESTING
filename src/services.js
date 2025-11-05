// Arreglo en memoria para almacenar los gastos
let gastos = [];
let nextId = 1;

// Obtener todos los gastos
export const obtenerGastos = () => {
  return [...gastos]; // Retorna una copia del arreglo
};

// Agregar un nuevo gasto
export const agregarGasto = (gasto) => {
  const nuevoGasto = {
    id: nextId++,
    ...gasto,
  };
  gastos.push(nuevoGasto);
  return nuevoGasto;
};

// Eliminar un gasto por ID
export const eliminarGasto = (id) => {
  const index = gastos.findIndex((g) => g.id === id);
  if (index !== -1) {
    gastos.splice(index, 1);
    return true;
  }
  return false;
};
