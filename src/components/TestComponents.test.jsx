/* eslint-env jest */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Form from "./Form";
import ListaGastos from "./ListaGastos";
import { agregarGasto, obtenerData, eliminarGasto } from "../services";

// Mock de los servicios
jest.mock("../services");

const gastosMock = [
  { fecha: "01/11/2025", nombre: "Pan", cantidad: 2, precio: 10 },
  { fecha: "02/11/2025", nombre: "Leche", cantidad: 1, precio: 15 },
];

const agregarGastoMock = (nuevoGasto) => {
  gastosMock.push(nuevoGasto);
};

const deleteGastoMock = (index) => {
  gastosMock.splice(index, 1);
};

describe("Form Component", () => {
  test("renderiza correctamente el formulario", () => {
    render(<Form />);
    expect(screen.getByLabelText(/descripción/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/monto/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /agregar gasto/i })
    ).toBeInTheDocument();
  });

  test("actualiza el estado al escribir en los inputs", () => {
    render(<Form />);
    const inputDescripcion = screen.getByLabelText(/descripción/i);
    const inputMonto = screen.getByLabelText(/monto/i);

    fireEvent.change(inputDescripcion, { target: { value: "Compra test" } });
    fireEvent.change(inputMonto, { target: { value: "100" } });

    expect(inputDescripcion.value).toBe("Compra test");
    expect(inputMonto.value).toBe("100");
  });

  test("llama a agregarGasto al enviar el formulario", async () => {
    agregarGasto.mockResolvedValue({});
    const mockCallback = jest.fn();

    render(<Form onGastoAgregado={mockCallback} />);

    fireEvent.change(screen.getByLabelText(/descripción/i), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByLabelText(/monto/i), {
      target: { value: "50" },
    });
    fireEvent.click(screen.getByRole("button", { name: /agregar gasto/i }));

    await waitFor(() => {
      expect(agregarGasto).toHaveBeenCalledWith(
        expect.objectContaining({
          descripcion: "Test",
          monto: 50,
        })
      );
    });
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
    render(<ListaGastos gastos={gastosMock} />);
    expect(screen.getByText("Pan")).toBeInTheDocument();
    expect(screen.getByText("Leche")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("15")).toBeInTheDocument();
  });

  test("Agrega un nuevo gasto, espera que sean 3 gastos", () => {
    const gasto = {
      fecha: "01/11/2025",
      nombre: "Huevo",
      cantidad: 2,
      precio: 10,
    };
    agregarGastoMock(gasto);
    render(<ListaGastos gastos={gastosMock} />);

    expect(screen.getAllByRole("row")).toHaveLength(4); // 3 gastos + 1 header
  });

  test("renderiza correctamente cuando no hay gastos", () => {
    render(<ListaGastos gastos={[]} />);
    expect(screen.getByText("Fecha")).toBeInTheDocument();
    expect(screen.queryByText("Pan")).not.toBeInTheDocument();
  });

  test("Calcula el total de los gastos: 35", () => {
    render(<ListaGastos gastos={gastosMock} />);
    const total = gastosMock.reduce((acc, gasto) => acc + gasto.precio, 0);
    expect(screen.getByText(`Total gastos: ${total}`)).toBeInTheDocument();
  });

  test("muestra loading inicialmente", () => {
    obtenerData.mockResolvedValue({ docs: [] });
    render(<ListaGastos />);
    expect(screen.getByText(/cargando gastos/i)).toBeInTheDocument();
  });

  test("muestra lista de gastos correctamente", async () => {
    const mockGastos = {
      docs: [
        { id: "1", data: () => ({ descripcion: "Gasto 1", monto: 100 }) },
        { id: "2", data: () => ({ descripcion: "Gasto 2", monto: 200 }) },
      ],
    };

    obtenerData.mockResolvedValue(mockGastos);

    render(<ListaGastos />);

    await waitFor(() => {
      expect(screen.getByText("Gasto 1")).toBeInTheDocument();
      expect(screen.getByText("Gasto 2")).toBeInTheDocument();
      expect(screen.getByText(/total: \$300\.00/i)).toBeInTheDocument();
    });
  });

  test("elimina un gasto al hacer click en eliminar", async () => {
    const mockGastos = {
      docs: [{ id: "1", data: () => ({ descripcion: "Gasto 1", monto: 100 }) }],
    };

    obtenerData.mockResolvedValue(mockGastos);
    eliminarGasto.mockResolvedValue({});
    window.confirm = jest.fn(() => true);

    render(<ListaGastos />);

    await waitFor(() => {
      expect(screen.getByText("Gasto 1")).toBeInTheDocument();
    });

    const btnEliminar = screen.getByText(/eliminar/i);
    fireEvent.click(btnEliminar);

    await waitFor(() => {
      expect(eliminarGasto).toHaveBeenCalledWith("1");
    });
  });
});
