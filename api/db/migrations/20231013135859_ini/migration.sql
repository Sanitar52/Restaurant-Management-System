/*
  Warnings:

  - You are about to drop the column `employeeid` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Employee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_restaurantid_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_userid_fkey";

-- DropIndex
DROP INDEX "User_employeeid_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "employeeid";

-- DropTable
DROP TABLE "Employee";
