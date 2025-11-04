/* eslint-env jest */
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "./Form.jsx";
import ListaGastos from "./ListaGastos.jsx";
import Contador from "./Contador.jsx";

describe("Componente Formulario", () => {
  test("renderiza el formulario correctamente", () => {
    render(<Form onAdd={jest.fn()} />);
    expect(screen.getByLabelText("Nombre")).toBeInTheDocument();
    expect(screen.getByLabelText("Cantidad")).toBeInTheDocument();
    expect(screen.getByLabelText("Precio")).toBeInTheDocument();
  });

  test("muestra un mensaje de error si los campos son inválidos", () => {
    const mockOnAdd = jest.fn();
    render(<Form onAdd={mockOnAdd} />);

    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "" },
    });
    fireEvent.change(screen.getByLabelText("Cantidad"), {
      target: { value: "0" },
    });
    fireEvent.change(screen.getByLabelText("Precio"), {
      target: { value: "0" },
    });
    fireEvent.submit(screen.getByTestId("form"));
    expect(
      screen.getByText("Por favor, completa todos los campos correctamente.")
    ).toBeInTheDocument();
  });

  test("limpia los campos después de agregar un gasto válido", () => {
    const mockOnAdd = jest.fn();
    render(<Form onAdd={mockOnAdd} />);

    fireEvent.change(screen.getByLabelText("Nombre"), {
      target: { value: "Pan" },
    });
    fireEvent.change(screen.getByLabelText("Cantidad"), {
      target: { value: "2" },
    });
    fireEvent.change(screen.getByLabelText("Precio"), {
      target: { value: "10" },
    });

    fireEvent.submit(screen.getByTestId("form"));

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText("Nombre").value).toBe("");
    expect(screen.getByLabelText("Cantidad").value).toBe("0");
    expect(screen.getByLabelText("Precio").value).toBe("0");
  });
});

describe("Componente Tabla", () => {
  test("renderiza la tabla correctamente", () => {
    render(<ListaGastos gastos={[]} />);
    expect(screen.getByText("Fecha")).toBeInTheDocument();
    expect(screen.getByText("Nombre")).toBeInTheDocument();
    expect(screen.getByText("Cantidad")).toBeInTheDocument();
    expect(screen.getByText("Precio")).toBeInTheDocument();
  });
  test("muestra los gastos en la tabla", () => {
    const gastos = [
      { fecha: "01/11/2025", nombre: "Pan", cantidad: 2, precio: 10 },
      { fecha: "02/11/2025", nombre: "Leche", cantidad: 1, precio: 15 },
    ];

    render(<ListaGastos gastos={gastos} />);

    expect(screen.getByText("Pan")).toBeInTheDocument();
    expect(screen.getByText("Leche")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
  });
  test("renderiza correctamente cuando no hay gastos", () => {
    render(<ListaGastos gastos={[]} />);
    expect(screen.getByText("Fecha")).toBeInTheDocument();
    expect(screen.queryByText("Pan")).not.toBeInTheDocument();
  });
});
