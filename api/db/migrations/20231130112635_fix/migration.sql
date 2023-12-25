/*
  Warnings:

  - You are about to drop the column `restaurantId` on the `RestaurantIngredient` table. All the data in the column will be lost.
  - Added the required column `restaurantCode` to the `RestaurantIngredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "RestaurantIngredient" DROP CONSTRAINT "RestaurantIngredient_restaurantId_fkey";

-- AlterTable
ALTER TABLE "RestaurantIngredient" DROP COLUMN "restaurantId",
ADD COLUMN     "restaurantCode" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "RestaurantIngredient" ADD CONSTRAINT "RestaurantIngredient_restaurantCode_fkey" FOREIGN KEY ("restaurantCode") REFERENCES "Restaurant"("restaurantCode") ON DELETE RESTRICT ON UPDATE CASCADE;
