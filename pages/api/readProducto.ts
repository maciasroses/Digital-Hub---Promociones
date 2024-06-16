import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      try {
        if (req.query.sku) {
          const data = await prisma.producto.findUnique({
            where: {
              sku: req.query.sku.toString(),
            },
          });
          return res.status(200).json(data);
        } else {
          const data = await prisma.producto.findMany();
          return res.status(200).json(data);
        }
      } catch (error) {
        return res.status(500).json({ message: "Error getting products" });
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}
