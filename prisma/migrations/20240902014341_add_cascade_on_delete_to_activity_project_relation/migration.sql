-- DropForeignKey
ALTER TABLE "activities" DROP CONSTRAINT "activities_project_id_fkey";

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;
