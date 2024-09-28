-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "base_experience" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "is_default" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_PokemonAbilities" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PokemonAbilities_AB_unique" ON "_PokemonAbilities"("A", "B");

-- CreateIndex
CREATE INDEX "_PokemonAbilities_B_index" ON "_PokemonAbilities"("B");

-- AddForeignKey
ALTER TABLE "_PokemonAbilities" ADD CONSTRAINT "_PokemonAbilities_A_fkey" FOREIGN KEY ("A") REFERENCES "Ability"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PokemonAbilities" ADD CONSTRAINT "_PokemonAbilities_B_fkey" FOREIGN KEY ("B") REFERENCES "Pokemon"("id") ON DELETE CASCADE ON UPDATE CASCADE;
