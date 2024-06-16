-- CreateEnum
CREATE TYPE "Categoria" AS ENUM ('Lacteos', 'Carnes', 'Frutas', 'Combo');

-- CreateEnum
CREATE TYPE "RecompensaTipo" AS ENUM ('Descuento_Porcentaje', 'Descuento_Monto', 'Producto_Gratis');

-- CreateTable
CREATE TABLE "Producto" (
    "sku" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio_neto" DOUBLE PRECISION NOT NULL,
    "ieps" DOUBLE PRECISION NOT NULL,
    "iva" DOUBLE PRECISION NOT NULL,
    "precio_total" DOUBLE PRECISION NOT NULL,
    "categoria" "Categoria" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("sku")
);

-- CreateTable
CREATE TABLE "Segmento" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Segmento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SegmentoOnProductos" (
    "productoId" TEXT NOT NULL,
    "segmentoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SegmentoOnProductos_pkey" PRIMARY KEY ("segmentoId","productoId")
);

-- CreateTable
CREATE TABLE "Promocion" (
    "id" TEXT NOT NULL,
    "fecha_termino" TIMESTAMP(3) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "presupuesto" DOUBLE PRECISION NOT NULL,
    "pais" TEXT NOT NULL,
    "ciudad" TEXT NOT NULL,
    "requisito" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productoId" TEXT,
    "recompensaProductoId" TEXT,
    "segmentoId" TEXT,

    CONSTRAINT "Promocion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SegmentoOnProductos" ADD CONSTRAINT "SegmentoOnProductos_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("sku") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SegmentoOnProductos" ADD CONSTRAINT "SegmentoOnProductos_segmentoId_fkey" FOREIGN KEY ("segmentoId") REFERENCES "Segmento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promocion" ADD CONSTRAINT "Promocion_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Producto"("sku") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promocion" ADD CONSTRAINT "Promocion_recompensaProductoId_fkey" FOREIGN KEY ("recompensaProductoId") REFERENCES "Producto"("sku") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promocion" ADD CONSTRAINT "Promocion_segmentoId_fkey" FOREIGN KEY ("segmentoId") REFERENCES "Segmento"("id") ON DELETE SET NULL ON UPDATE CASCADE;
