-- CreateTable
CREATE TABLE "MixMaker" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_SongToMixMaker" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_SongToMixMaker_A_fkey" FOREIGN KEY ("A") REFERENCES "MixMaker" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_SongToMixMaker_B_fkey" FOREIGN KEY ("B") REFERENCES "Song" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_SongToMixMaker_AB_unique" ON "_SongToMixMaker"("A", "B");

-- CreateIndex
CREATE INDEX "_SongToMixMaker_B_index" ON "_SongToMixMaker"("B");
