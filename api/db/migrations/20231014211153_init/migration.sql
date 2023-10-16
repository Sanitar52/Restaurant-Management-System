/*
  Warnings:

  - You are about to drop the column `restaurantCode` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_restaurantCode_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "restaurantCode";

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "restaurantCode" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_userid_key" ON "Employee"("userid");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_restaurantCode_fkey" FOREIGN KEY ("restaurantCode") REFERENCES "Restaurant"("restaurantCode") ON DELETE RESTRICT ON UPDATE CASCADE;
