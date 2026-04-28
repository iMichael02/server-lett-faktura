/*
  Warnings:

  - A unique constraint covering the columns `[articleNo]` on the table `prices` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "prices" ADD COLUMN     "articleNo" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "prices_articleNo_key" ON "prices"("articleNo");
