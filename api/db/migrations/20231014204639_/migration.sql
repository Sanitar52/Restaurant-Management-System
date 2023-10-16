/*
  Warnings:

  - You are about to drop the column `restaurantId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[restaurantCode]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `restaurantCode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_restaurantId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "restaurantId",
ADD COLUMN     "restaurantCode" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_restaurantCode_key" ON "Restaurant"("restaurantCode");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_restaurantCode_fkey" FOREIGN KEY ("restaurantCode") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
