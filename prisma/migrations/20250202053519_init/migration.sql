-- DropForeignKey
ALTER TABLE "KeyResult" DROP CONSTRAINT "KeyResult_objectiveID_fkey";

-- AddForeignKey
ALTER TABLE "KeyResult" ADD CONSTRAINT "KeyResult_objectiveID_fkey" FOREIGN KEY ("objectiveID") REFERENCES "Objective"("id") ON DELETE CASCADE ON UPDATE CASCADE;
