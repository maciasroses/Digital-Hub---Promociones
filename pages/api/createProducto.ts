import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";

type productoProps = {
  sku: string;
  nombre: string;
  precio_neto: number;
  ieps: number;
  iva: number;
  precio_total: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const producto: productoProps = JSON.parse(req.body);
    if (req.method === "POST") {
      if (!producto.nombre.length) {
        return res
          .status(500)
          .json({ message: "Please do not leave this empty" });
      }
      try {
        const data = await prisma.producto.create({
          data: {
            nombre: producto.nombre,
            precio_neto: producto.precio_neto,
            ieps: producto.ieps,
            iva: producto.iva,
            precio_total: producto.precio_total,
          },
        });
        return res.status(200).json({ data, message: "Event successfully" });
      } catch (error) {
        return res
          .status(500)
          .json({ message: "Error creating a new product" });
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}
