"use client";

import React, { useState } from "react";
import Image from "next/image";
import Promo1 from "@/public/promo1.png";

interface PromoCardProps {
  nombre: string;
  descripcion: string;
  precio: number;
}

const PromoCard = ({ nombre, descripcion, precio }: PromoCardProps) => {
  const [quantity, setQuantity] = useState(0);

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
      <button
        type="button"
        className="absolute top-3 right-3 bg-red-600 rounded-full p-2 z-50"
      >
        <img
          className="w-6"
          src="https://static-00.iconduck.com/assets.00/live-chat-icon-2048x1882-k954apfz.png"
          alt="Live Chat"
        />
      </button>

      <div className="relative pt-10 px-10 flex items-center justify-center">
        <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3"></div>
        <Image className="relative w-40 h-40" src={Promo1} alt="" />
      </div>
      <div className="relative text-black px-6 pb-6 mt-6">
        <span className="block font-semibold text-xl">{nombre}</span>
        <div className="flex justify-between">
          <span className="block text-black bg-transparent rounded-full text-orange-500 text-xs font-bold py-2 leading-none flex items-center">
            ${precio}
          </span>
          <span className="block text-red-600 bg-transparent line-through rounded-full text-orange-500 text-xs font-bold py-2 leading-none flex items-center">
            $63.00
          </span>
        </div>
        <div className="flex justify-between">
          {quantity === 0 ? (
            <button
              onClick={handleAddClick}
              className="block text-white bg-red-600 rounded-full text-orange-500 text-xs font-bold px-6 py-2 leading-none flex items-center"
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
  return (
    <div className="p-24 flex flex-wrap items-center justify-center">
      <PromoCard
        nombre="5 cajas de Coca-Cola + 1 caja de Fuze tea"
        descripcion=""
        precio={36.0}
      />
    </div>
  );
}
