/*
  Warnings:

  - You are about to drop the `MadiLikes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `MadiLikes` DROP FOREIGN KEY `MadiLikes_ibfk_1`;

-- DropForeignKey
ALTER TABLE `MadiLikes` DROP FOREIGN KEY `MadiLikes_ibfk_2`;

-- DropTable
DROP TABLE `MadiLikes`;

-- CreateTable
CREATE TABLE `MadiLike` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `madiId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MadiLike` ADD FOREIGN KEY (`madiId`) REFERENCES `Madi`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MadiLike` ADD FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
