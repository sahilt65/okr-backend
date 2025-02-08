-- CreateTable
CREATE TABLE "Objective" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    CONSTRAINT "Objective_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KeyResult" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "initialValue" INTEGER NOT NULL,
    "currentValue" INTEGER NOT NULL,
    "targetValue" INTEGER NOT NULL,
    "metrics" TEXT NOT NULL,
    "objectiveID" INTEGER NOT NULL,

    CONSTRAINT "KeyResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "KeyResult" ADD CONSTRAINT "KeyResult_objectiveID_fkey" FOREIGN KEY ("objectiveID") REFERENCES "Objective"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
