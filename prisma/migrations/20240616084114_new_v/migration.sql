/*
  Warnings:

  - You are about to drop the column `categoria` on the `Producto` table. All the data in the column will be lost.
  - Added the required column `nombre` to the `Segmento` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Producto" DROP COLUMN "categoria";

-- AlterTable
ALTER TABLE "Segmento" ADD COLUMN     "nombre" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Categoria";
