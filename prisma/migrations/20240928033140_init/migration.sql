-- CreateTable
CREATE TABLE "Ability" (
    "id" SERIAL NOT NULL,
    "is_main_series" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "language" TEXT NOT NULL,

    CONSTRAINT "Ability_pkey" PRIMARY KEY ("id")
);
