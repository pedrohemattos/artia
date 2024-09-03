-- CreateTable
CREATE TABLE "projects" (
    "project_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("project_id")
);

-- CreateTable
CREATE TABLE "activities" (
    "activity_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "project_id" TEXT,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("activity_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "projects_project_id_key" ON "projects"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "activities_activity_id_key" ON "activities"("activity_id");

-- AddForeignKey
ALTER TABLE "activities" ADD CONSTRAINT "activities_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("project_id") ON DELETE SET NULL ON UPDATE CASCADE;
