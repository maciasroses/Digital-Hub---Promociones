"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Chatbot from "./Chatbot";

interface PromoCardProps {
  nombre: string;
  id: string;
  descripcion: string;
  imagen: string;
  precioWithPromo: number;
  precioWithoutPromo: number;
  updateLocalStorage: (id: string, quantity: number) => void;
}

const PromoCard = ({
  nombre,
  descripcion,
  imagen,
  precioWithPromo,
  precioWithoutPromo,
  id,
  updateLocalStorage,
}: PromoCardProps) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    updateLocalStorage(id, quantity);
  }, [quantity]);

  const handleAddClick = () => {
    setQuantity(1);
  };

  const handleIncrease = () => {
    setQuantity((prev) => Math.min(prev + 1, 3));
  };

  const handleDecrease = () => {
    setQuantity((prev) => {
      if (prev === 1) return 0;
      return Math.max(prev - 1, 1);
    });
  };

  return (
    <div className="flex-shrink-0 m-6 relative overflow-hidden bg-stone-200 rounded-lg max-w-xs shadow-lg">
      <svg
        className="absolute bottom-0 left-0 mb-8"
        viewBox="0 0 375 283"
        fill="none"
      >
        <rect
          x="159.52"
          y="175"
          width="152"
          height="152"
          rx="8"
          transform="rotate(-45 159.52 175)"
          fill="#f5f5f4"
        />
        <rect
          y="107.48"
          width="152"
          height="152"
          rx="8"
          transform="rotate(-45 0 107.48)"
          fill="#f5f5f4"
        />
      </svg>

      <Chatbot description={descripcion} width="w-6" />

      <div className="relative pt-10 px-10 flex items-center justify-center">
        <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"></div>
        <Image
          className="relative w-40 h-40"
          src={imagen}
          alt=""
          width={100}
          height={100}
        />
      </div>
      <div className="relative text-black px-6 pb-6 mt-6">
        <span className="block font-semibold text-2xl">{nombre}</span>
        <div className="flex gap-3">
          <span className="block text-red-600 bg-transparent line-through rounded-full text-orange-500 text-xl font-bold py-2 leading-none flex items-center">
            $
            {(quantity == 0
              ? precioWithoutPromo
              : precioWithoutPromo * quantity
            ).toFixed(2)}
          </span>
          <span className="block text-black bg-transparent rounded-full text-green-700 text-3xl font-bold py-2 leading-none flex items-center">
            $
            {(quantity == 0
              ? precioWithPromo
              : precioWithPromo * quantity
            ).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-end">
          {quantity === 0 ? (
            <button
              onClick={handleAddClick}
              className="block text-white bg-red-600 rounded-full text-orange-500 text-base font-bold px-6 py-2 leading-none flex items-center"
            >
              Agregar
            </button>
          ) : (
            <div className="flex items-center">
              <button
                onClick={handleDecrease}
                className="block text-white bg-red-600 rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none flex items-center"
              >
                -
              </button>
              <span className="px-4">{quantity}</span>
              <button
                onClick={handleIncrease}
                className="block text-white bg-red-600 rounded-full text-orange-500 text-xs font-bold px-3 py-2 leading-none flex items-center"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const [promotions, setPromotions] = useState([] as any);

  const calculatePriceByType = (
    type: string,
    porcentaje: number,
    descuento: number,
    price: number,
    freeProductPrice: number,
    req: string
  ) => {
    const precioReq = price * Number(req);
    switch (type) {
      case "Descuento_Porcentaje":
        return {
          priceWithPromo: precioReq - (precioReq * porcentaje) / 100,
          priceWithoutPromo: precioReq,
        };
      case "Descuento_Monto":
        return {
          priceWithPromo: precioReq - descuento,
          priceWithoutPromo: precioReq,
        };
      case "Producto_Gratis":
        return {
          priceWithPromo: precioReq,
          priceWithoutPromo: precioReq + freeProductPrice,
        };
      default:
        return {
          priceWithPromo: precioReq,
          priceWithoutPromo: precioReq,
        };
    }
  };

  interface pricesProps {
    priceWithPromo: number;
    priceWithoutPromo: number;
  }

  useEffect(() => {
    try {
      const fetchPromotions = async () => {
        const res = await fetch("/api/readPromocion");
        if (res.ok) {
          const data = await res.json();
          const formatedData = data.map((promotion: any) => {
            const { priceWithPromo, priceWithoutPromo }: pricesProps =
              calculatePriceByType(
                promotion.tipo,
                promotion.porcentaje,
                promotion.descuento,
                promotion.producto.precio_total,
                promotion.recomenpensaProducto?.precio_total || 0,
                promotion.requisito
              );
            return {
              ...promotion,
              precioWithPromo: priceWithPromo,
              precioWithoutPromo: priceWithoutPromo,
            };
          });
          window.localStorage.setItem(
            "promotions",
            JSON.stringify(formatedData)
          );
          setPromotions(formatedData);
        }
      };
      fetchPromotions();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const updateLocalStorage = (id: string, quantity: number) => {
    const currentData = JSON.parse(localStorage.getItem("cart") || "[]");

    const newData = currentData.filter((item: any) => item.id !== id);
    if (quantity > 0) {
      const promotion = promotions.find((promo: any) => promo.id === id);
      if (promotion) {
        newData.push({ ...promotion, quantity });
      }
    }
    localStorage.setItem("cart", JSON.stringify(newData));
  };

  return (
    <div className="p-24 flex flex-wrap items-center justify-center">
      {promotions &&
        promotions.length > 0 &&
        promotions.map((promotion: any) => (
          <PromoCard
            key={promotion.id}
            id={promotion.id}
            nombre={promotion.titulo}
            descripcion={promotion.descripcion}
            imagen={promotion.imagen}
            precioWithPromo={promotion.precioWithPromo}
            precioWithoutPromo={promotion.precioWithoutPromo}
            updateLocalStorage={updateLocalStorage}
          />
        ))}
    </div>
  );
}
