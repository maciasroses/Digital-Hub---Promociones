/*
  Warnings:

  - Added the required column `tipo` to the `Promocion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Promocion" ADD COLUMN     "descuento" DOUBLE PRECISION,
ADD COLUMN     "porcentaje" DOUBLE PRECISION,
ADD COLUMN     "tipo" "RecompensaTipo" NOT NULL;
