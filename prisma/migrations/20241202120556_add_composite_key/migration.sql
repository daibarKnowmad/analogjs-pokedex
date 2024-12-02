-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FavoritePokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pokemonId" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_FavoritePokemon" ("id", "name", "pokemonId") SELECT "id", "name", "pokemonId" FROM "FavoritePokemon";
DROP TABLE "FavoritePokemon";
ALTER TABLE "new_FavoritePokemon" RENAME TO "FavoritePokemon";
CREATE UNIQUE INDEX "FavoritePokemon_pokemonId_name_key" ON "FavoritePokemon"("pokemonId", "name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
