-- DropForeignKey
ALTER TABLE "Repetition" DROP CONSTRAINT "Repetition_blockId_fkey";

-- AddForeignKey
ALTER TABLE "Repetition" ADD CONSTRAINT "Repetition_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "Block"("id") ON DELETE CASCADE ON UPDATE CASCADE;
