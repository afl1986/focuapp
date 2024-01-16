-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BlockToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BlockToTag_AB_unique" ON "_BlockToTag"("A", "B");

-- CreateIndex
CREATE INDEX "_BlockToTag_B_index" ON "_BlockToTag"("B");

-- AddForeignKey
ALTER TABLE "_BlockToTag" ADD CONSTRAINT "_BlockToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Block"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BlockToTag" ADD CONSTRAINT "_BlockToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
