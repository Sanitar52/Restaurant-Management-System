/*
  Warnings:

  - You are about to drop the `RestaurantRatings` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RestaurantRatings" DROP CONSTRAINT "RestaurantRatings_restaurantCode_fkey";

-- DropForeignKey
ALTER TABLE "RestaurantRatings" DROP CONSTRAINT "RestaurantRatings_userId_fkey";

-- DropTable
DROP TABLE "RestaurantRatings";

-- CreateTable
CREATE TABLE "RestaurantRating" (
    "id" SERIAL NOT NULL,
    "restaurantCode" INTEGER NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "RestaurantRating_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RestaurantRating" ADD CONSTRAINT "RestaurantRating_restaurantCode_fkey" FOREIGN KEY ("restaurantCode") REFERENCES "Restaurant"("restaurantCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RestaurantRating" ADD CONSTRAINT "RestaurantRating_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
