import React from "react";
import { useHistory } from "react-router-dom";
import InfoPromo from "./InfoPromo";

interface PromoCardProps {
  nombre: string;
  descripcion: string;
  precio: number;
}

export default function Home() {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "36px",
        width: "300px",
      }}
    >
      <img
        src="lacteos.jpg"
        alt="Promo"
        style={{ width: "100%", borderRadius: "8px" }}
      />
      <h2
        style={{
          color: "white",
          weight: "bold",
        }}
      >
        3x2 en leche Lala{" "}
      </h2>
      <p>descripción</p>
      <h3>$precio</h3>
      <button
        style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}
      >
        Agregar
      </button>
    </div>
  );
}
