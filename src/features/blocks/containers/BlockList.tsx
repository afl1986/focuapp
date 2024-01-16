import type { Block, Tag } from '@prisma/client'
import dayjs from 'dayjs'
import { useCallback, type FC } from 'react'

import { Badge } from '@/shared/components/ui/badge'
import { Input } from '@/shared/components/ui/input'
import { ScrollArea } from '@/shared/components/ui/scroll-area'
import { cn } from '@/shared/lib'
import { api } from '@/shared/utils/api'
import { Search } from 'lucide-react'
import { NewBlock } from './NewBlock'

type TBlockWithTags = Block & {
  tags: Tag[]
}

interface BlockListProps {
  blocks: TBlockWithTags[]
}

export const BlockList: FC<BlockListProps> = ({ blocks }) => {
  const utils = api.useUtils()

  const deleteBlock = api.blocks.delete.useMutation({
    async onSuccess() {
      await utils.blocks.getAll.invalidate()
    },
  })
  const handleDelete = useCallback(
    async (postId: number) => {
      try {
        await deleteBlock.mutateAsync({ postId })
      } catch (error) {
        console.log(error)
      }
    },
    [deleteBlock],
  )
  return (
    <>
      <div className="border-b h-[52px] flex items-center px-4 py-2">
        <h1 className="text-xl font-bold">Blocks</h1>
      </div>
      <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <form>
          <div className="relative flex flex-row gap-4">
            <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search" className="pl-8" />
            <NewBlock />
          </div>
        </form>
      </div>
      <ScrollArea className="h-screen">
        <div className="flex flex-col gap-2 p-4 pt-0">
          {blocks.map((block) => (
            <button
              key={block.id}
              className={cn(
                'flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent',
                //   mail.selected === item.id && 'bg-muted',
              )}
              onClick={() => handleDelete(block.id)}
            >
              <div className="flex w-full flex-col gap-1">
                <div className="flex items-center">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold">{block.title}</div>

                    <span className="flex h-2 w-2 rounded-full bg-blue-600" />
                  </div>
                  <div
                    className={cn(
                      'ml-auto text-xs',
                      // mail.selected === item.id
                      //   ? 'text-foreground'
                      //   : 'text-muted-foreground',
                    )}
                  >
                    {dayjs(block.createdAt).format('DD MMM YYYY - H:mm')}
                  </div>
                </div>
                <div className="text-xs font-medium">Название курса</div>
              </div>
              <div className="line-clamp-2 text-xs text-muted-foreground">
                {block?.description?.substring(0, 300)}
              </div>
              {block.tags.length ? (
                <div className="flex items-center gap-2">
                  {block.tags.map(({ id, name }) => (
                    <Badge defaultChecked={true} key={id}>
                      {name}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </button>
          ))}
        </div>
      </ScrollArea>
    </>
  )
}
