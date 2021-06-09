/*
  Warnings:

  - You are about to drop the `Likes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Likes` DROP FOREIGN KEY `Likes_ibfk_1`;

-- DropForeignKey
ALTER TABLE `Likes` DROP FOREIGN KEY `Likes_ibfk_2`;

-- DropTable
DROP TABLE `Likes`;

-- CreateTable
CREATE TABLE `MadiLikes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `madiId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MadiLikes` ADD FOREIGN KEY (`madiId`) REFERENCES `Madi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MadiLikes` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
