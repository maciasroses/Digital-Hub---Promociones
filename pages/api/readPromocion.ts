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
          });
          return res.status(200).json(data);
        } else {
          const data = await prisma.promocion.findMany();
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
