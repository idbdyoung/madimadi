/*
  Warnings:

  - Added the required column `thumbnailHeight` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailWidth` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Video` ADD COLUMN `thumbnailHeight` INTEGER NOT NULL,
    ADD COLUMN `thumbnailWidth` INTEGER NOT NULL;
