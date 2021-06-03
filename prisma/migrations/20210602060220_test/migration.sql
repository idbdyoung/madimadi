/*
  Warnings:

  - You are about to drop the `Madi` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Madi` DROP FOREIGN KEY `Madi_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Likes` DROP FOREIGN KEY `Likes_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Likes` DROP FOREIGN KEY `Likes_ibfk_2`;

-- DropTable
DROP TABLE `Madi`;

-- DropTable
DROP TABLE `Likes`;
