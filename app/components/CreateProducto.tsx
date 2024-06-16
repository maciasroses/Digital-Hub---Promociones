"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ProductoProps = {
  nombre: string;
  precio_neto: number;
  ieps: number;
  iva: number;
  precio_total: number;
};

const CreateProducto = () => {
  const [data, setData] = useState<ProductoProps>({
    nombre: "",
    precio_neto: 0,
    ieps: 0,
    iva: 0,
    precio_total: 0,
  });

  const submitProducto = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/createProducto", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert("Producto registrado");
        setData({
          nombre: "",
          precio_neto: 0,
          ieps: 0,
          iva: 0,
          precio_total: 0,
        });
      } else {
        alert("Error al registrar el producto");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={submitProducto}>
      <input
        type="text"
        defaultValue={data.nombre}
        placeholder="Nombre del Producto"
        onChange={(e) => setData({ ...data, nombre: e.target.value })}
      />
      <input
        type="number"
        defaultValue={data.precio_neto}
        placeholder="Precio Neto"
        onChange={(e) => setData({ ...data, precio_neto: +e.target.value })}
      />
      <input
        type="number"
        defaultValue={data.ieps}
        placeholder="IEPS"
        onChange={(e) => setData({ ...data, ieps: +e.target.value })}
      />
      <input
        type="number"
        defaultValue={data.iva}
        placeholder="IVA"
        onChange={(e) => setData({ ...data, iva: +e.target.value })}
      />
      <input
        type="number"
        defaultValue={data.precio_total}
        placeholder="Precio Total"
        onChange={(e) => setData({ ...data, precio_total: +e.target.value })}
      />
      <button type="submit">Registrar</button>
    </form>
  );
};

export default CreateProducto;
