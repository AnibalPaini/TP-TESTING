import React, { useEffect, useState } from "react";
import Form from "./components/Form.jsx";
import ListaGastos from "./components/ListaGastos.jsx";

const App = () => {
  const [gastos, setGastos] = useState([]);

  useEffect(() => {
    const datos = JSON.parse(localStorage.getItem("gastos"));
    setGastos(datos);
  }, []);

  const handleAddGasto = (gasto) => {
    const next = [...gastos, gasto];
    setGastos(next);
    localStorage.setItem("gastos", JSON.stringify(next));
  };

  return (
    <div>
      <Form onAdd={handleAddGasto} />
      <ListaGastos gastos={gastos} />
    </div>
  );
};

export default App;
