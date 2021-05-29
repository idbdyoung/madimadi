/*
  Warnings:

  - You are about to drop the column `userProfileImage` on the `User` table. All the data in the column will be lost.
  - Added the required column `userPhoto` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `userProfileImage`,
    ADD COLUMN `userPhoto` VARCHAR(191) NOT NULL;
