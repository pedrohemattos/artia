/*
  Warnings:

  - Made the column `project_id` on table `activities` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_project_id_fkey";

-- AlterTable
ALTER TABLE "activities" ALTER COLUMN "project_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;
