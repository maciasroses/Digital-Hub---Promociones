/*
  Warnings:

  - Added the required column `titulo` to the `Promocion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Promocion" ADD COLUMN     "titulo" TEXT NOT NULL;
