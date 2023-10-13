/*
  Warnings:

  - A unique constraint covering the columns `[employeeid]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `employeeid` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "employeeid" INTEGER NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "restaurantid" INTEGER NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_userid_key" ON "Employee"("userid");

-- CreateIndex
CREATE UNIQUE INDEX "User_employeeid_key" ON "User"("employeeid");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_userid_fkey" FOREIGN KEY ("userid") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_restaurantid_fkey" FOREIGN KEY ("restaurantid") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
