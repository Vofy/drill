-- CreateTable
CREATE TABLE "Quiz" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "quizId" INTEGER NOT NULL,
    "title" TEXT,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Choice" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "Choice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChoiceOption" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "correct" BOOLEAN NOT NULL,

    CONSTRAINT "ChoiceOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DragAndDrop" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,

    CONSTRAINT "DragAndDrop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DragAndDropOption" (
    "id" SERIAL NOT NULL,
    "taskId" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "DragAndDropOption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Choice_taskId_key" ON "Choice"("taskId");

-- CreateIndex
CREATE UNIQUE INDEX "DragAndDrop_taskId_key" ON "DragAndDrop"("taskId");

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quiz"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Choice" ADD CONSTRAINT "Choice_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChoiceOption" ADD CONSTRAINT "ChoiceOption_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Choice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DragAndDrop" ADD CONSTRAINT "DragAndDrop_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DragAndDropOption" ADD CONSTRAINT "DragAndDropOption_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "DragAndDrop"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
