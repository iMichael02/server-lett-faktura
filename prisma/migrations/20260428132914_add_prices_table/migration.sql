-- CreateTable
CREATE TABLE "prices" (
    "id" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "inPrice" DOUBLE PRECISION NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "unit" TEXT NOT NULL,
    "inStock" INTEGER NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "prices_pkey" PRIMARY KEY ("id")
);
