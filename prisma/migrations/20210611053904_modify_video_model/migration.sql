/*
  Warnings:

  - You are about to drop the column `thumbnailHeight` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailWidth` on the `Video` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Video` DROP COLUMN `thumbnailHeight`,
    DROP COLUMN `thumbnailWidth`;
