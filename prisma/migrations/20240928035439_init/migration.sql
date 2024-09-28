/*
  Warnings:

  - Changed the type of `is_main_series` on the `Ability` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Ability" DROP COLUMN "is_main_series",
ADD COLUMN     "is_main_series" BOOLEAN NOT NULL;
