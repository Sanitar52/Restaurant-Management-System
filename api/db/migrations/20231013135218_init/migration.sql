/*
  Warnings:

  - You are about to drop the column `name` on the `Restaurant` table. All the data in the column will be lost.
  - Added the required column `restaurantCode` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurantName` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "name",
ADD COLUMN     "restaurantCode" INTEGER NOT NULL,
ADD COLUMN     "restaurantName" TEXT NOT NULL;
