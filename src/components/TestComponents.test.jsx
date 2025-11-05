/* eslint-env jest */
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "./Form";
import ListaGastos from "./ListaGastos";
import { agregarGasto, obtenerGastos } from "../services";

// Mock de los servicios
jest.mock("../services");

describe("Form Component - Tests Básicos", () => {
  test("no envía el formulario si descripción está vacía", () => {
    agregarGasto.mockImplementation(() => {});
    const mockCallback = jest.fn();

    render(<Form onGastoAgregado={mockCallback} />);

    // Solo llenar monto, dejar descripción vacía
    fireEvent.change(screen.getByLabelText("Monto:"), {
      target: { value: "100" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Agregar Gasto" }));

    // No debe llamar a agregarGasto ni al callback
    expect(agregarGasto).not.toHaveBeenCalled();
    expect(mockCallback).not.toHaveBeenCalled();

    //Se muestra el mensaje de error
    expect(
      screen.getByText("Por favor, complete todos los campos.")
    ).toBeInTheDocument();
  });

  test("carga correctamente los datos del formulario", () => {
    render(<Form />);

    const inputDescripcion = screen.getByLabelText("Descripción:");
    const inputMonto = screen.getByLabelText("Monto:");

    // Escribir valores
    fireEvent.change(inputDescripcion, { target: { value: "Supermercado" } });
    fireEvent.change(inputMonto, { target: { value: "250.50" } });

    // Verificar que los inputs tienen los valores correctos
    expect(inputDescripcion.value).toBe("Supermercado");
    expect(inputMonto.value).toBe("250.50");
  });

  test("el input monto solo recibe números", () => {
    render(<Form />);

    const inputMonto = screen.getByLabelText("Monto:");

    // Le pasamos un valor no numérico, debería no escribirlo
    fireEvent.change(inputMonto, { target: { value: "test" } });

    // Verificar que el input es de tipo number
    expect(inputMonto).toHaveAttribute("type", "number");
    expect(inputMonto).toHaveAttribute("step", "0.01");
    expect(inputMonto.value).toBe("");
  });
});

describe("ListaGastos Component - Test de grabación", () => {
  test("Cargo un gasto y se renderiza", () => {
    const gastoGuardado = {
      id: 1,
      descripcion: "Café",
      monto: 50,
      fecha: new Date().toISOString(),
    };
    obtenerGastos.mockReturnValue([gastoGuardado]);
    render(<ListaGastos refresh={0} />);
    expect(screen.getByText("Café")).toBeInTheDocument();
    expect(screen.getByText("$50.00")).toBeInTheDocument();
  });

  test("Muestra mensaje cuando no hay gastos", () => {
    obtenerGastos.mockReturnValue([]);
    render(<ListaGastos refresh={0} />);
    expect(screen.getByText("No hay gastos registrados")).toBeInTheDocument();
  });

  test("Cargo un gasto y se renderiza", () => {
    const gastoGuardado = [
      {
        id: 1,
        descripcion: "Café",
        monto: 50,
        fecha: new Date().toISOString(),
      },
      {
        id: 2,
        descripcion: "Comida",
        monto: 150,
        fecha: new Date().toISOString(),
      },
    ];
    obtenerGastos.mockReturnValue(gastoGuardado);
    render(<ListaGastos refresh={0} />);
    expect(screen.getByText("Total: $200.00")).toBeInTheDocument();
  });
});

//Flujo de test de integración agregar gasto, vargar en la lista, verificar que se cargo correctamente, eliminarlo y verificar que se elimino
