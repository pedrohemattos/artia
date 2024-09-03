/*
  Warnings:

  - Added the required column `completed` to the `activities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "activities" ADD COLUMN     "completed" BOOLEAN NOT NULL;
