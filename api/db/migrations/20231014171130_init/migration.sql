/*
  Warnings:

  - You are about to drop the column `restaurantName` on the `Restaurant` table. All the data in the column will be lost.
  - Added the required column `body` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "restaurantName",
ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "logo" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
