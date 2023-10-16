-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_restaurantCode_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_restaurantCode_fkey" FOREIGN KEY ("restaurantCode") REFERENCES "Restaurant"("restaurantCode") ON DELETE RESTRICT ON UPDATE CASCADE;
