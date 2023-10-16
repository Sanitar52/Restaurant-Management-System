/*
  Warnings:

  - Added the required column `description` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `MenuItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `restaurantCode` to the `MenuItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MenuItem" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "logo" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "restaurantCode" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "MenuItem" ADD CONSTRAINT "MenuItem_restaurantCode_fkey" FOREIGN KEY ("restaurantCode") REFERENCES "Restaurant"("restaurantCode") ON DELETE RESTRICT ON UPDATE CASCADE;
