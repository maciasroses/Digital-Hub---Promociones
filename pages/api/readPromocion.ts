import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "GET") {
      try {
        if (req.query.id) {
          const data = await prisma.promocion.findUnique({
            where: {
              id: req.query.id.toString(),
            },
            include: {
              producto: {
                select: {
                  precio_total: true,
                },
              },
              recomenpensaProducto: {
                select: {
                  precio_total: true,
                },
              },
            },
          });
          return res.status(200).json(data);
        } else {
          const data = await prisma.promocion.findMany({
            include: {
              producto: {
                select: {
                  precio_total: true,
                },
              },
              recomenpensaProducto: {
                select: {
                  precio_total: true,
                },
              },
            },
          });
          return res.status(200).json(data);
        }
      } catch (error) {
        return res.status(500).json({ message: "Error getting promociones" });
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}
