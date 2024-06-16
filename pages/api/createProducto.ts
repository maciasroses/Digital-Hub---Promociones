import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@prisma/client";

type productoProps = {
  sku: string;
  nombre: string;
  precio_neto: number;
  ieps: number;
  iva: number;
  precio_total: number;
  categoria: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const producto: productoProps = JSON.parse(req.body);
    if (req.method === "POST") {
      if (!post.title.length) {
        return res
          .status(500)
          .json({ message: "Please do not leave this empty" });
      }
      try {
        const data = await prisma.post.create({
          data: {
            title: post.title,
          },
        });
        // res.status(200).json(data)
        return res.status(200).json({ data, message: "Event successfully" });
      } catch (error) {
        return res.status(500).json({ message: "Error creating a new post" });
      }
    }
  } catch (error) {
    return res.status(500).json(error);
  }
}
