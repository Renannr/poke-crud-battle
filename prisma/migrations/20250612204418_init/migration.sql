-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "treinador" TEXT NOT NULL,
    "nivel" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);
