/*
  Warnings:

  - Added the required column `description` to the `MixMaker` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MixMaker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_MixMaker" ("id", "name") SELECT "id", "name" FROM "MixMaker";
DROP TABLE "MixMaker";
ALTER TABLE "new_MixMaker" RENAME TO "MixMaker";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
