-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "restaurantCode" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_restaurantCode_fkey" FOREIGN KEY ("restaurantCode") REFERENCES "Restaurant"("restaurantCode") ON DELETE RESTRICT ON UPDATE CASCADE;
