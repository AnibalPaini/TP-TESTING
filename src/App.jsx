import { useState } from "react";
import Form from "./components/Form";
import ListaGastos from "./components/ListaGastos";
import "./App.css";

function App() {
  const [refresh, setRefresh] = useState(0);

  const handleGastoAgregado = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <div className="App">
      <h1>Gestor de Gastos</h1>
      <div className="contenedor-app">
        <Form onGastoAgregado={handleGastoAgregado} />
        <ListaGastos refresh={refresh} />
      </div>
    </div>
  );
}

export default App;
