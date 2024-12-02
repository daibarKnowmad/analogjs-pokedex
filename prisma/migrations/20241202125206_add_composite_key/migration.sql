/*
  Warnings:

  - You are about to alter the column `pokemonId` on the `FavoritePokemon` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FavoritePokemon" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "pokemonId" INTEGER NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_FavoritePokemon" ("id", "name", "pokemonId") SELECT "id", "name", "pokemonId" FROM "FavoritePokemon";
DROP TABLE "FavoritePokemon";
ALTER TABLE "new_FavoritePokemon" RENAME TO "FavoritePokemon";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
