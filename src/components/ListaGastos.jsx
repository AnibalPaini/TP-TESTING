import React, { useState } from "react";
import "./ListaGastos.css";

const ListaGastos = ({ gastos }) => {
    const total = gastos.reduce((acc, gasto) => acc +  gasto.precio, 0);
  return (
    <div className="">
      <div className="lg-wrapper">
        <table className="lg-table" role="table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio</th>
            </tr>
          </thead>
          <tbody>
            {gastos.map((gasto, index) => (
              <tr key={index}>
                <td>{gasto.fecha}</td>
                <td>{gasto.nombre}</td>
                <td className="lg-number">{gasto.cantidad}</td>
                <td className="lg-number">{gasto.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>Total gastos: {total || 0}</p>
    </div>
  );
};

export default ListaGastos;
