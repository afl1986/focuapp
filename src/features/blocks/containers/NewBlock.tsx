import { Li, Ul } from '@/shared/components/list'
import { Badge } from '@/shared/components/ui/badge'
import { Button } from '@/shared/components/ui/button'
import { Calendar } from '@/shared/components/ui/calendar'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
} from '@/shared/components/ui/form'
import { Input } from '@/shared/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover'
import { Separator } from '@/shared/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet'
import { Textarea } from '@/shared/components/ui/textarea'
import { cn } from '@/shared/lib'
import { api } from '@/shared/utils/api'
import { getRepetitionSteps } from '@/shared/utils/replays'
import { zodResolver } from '@hookform/resolvers/zod'
import { format } from 'date-fns'
import { CalendarIcon, PlusCircle } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { type z } from 'zod'
import { CreateBlockSchema } from '../utils/schema'

export const NewBlock = () => {
  const utils = api.useUtils()
  const addBlock = api.blocks.create.useMutation({
    async onSuccess() {
      await utils.blocks.getAll.invalidate()
    },
  })

  const form = useForm<z.infer<typeof CreateBlockSchema>>({
    resolver: zodResolver(CreateBlockSchema),
    defaultValues: {
      date: new Date(),
    },
  })
  const selectedDate = form.watch('date')

  const handleSubmit = useCallback(
    async (data: z.infer<typeof CreateBlockSchema>) => {
      try {
        await addBlock.mutateAsync(data)
      } catch (error) {
        console.log(error)
      }
    },
    [addBlock],
  )
  const handleOpenChange = useCallback(
    (open: boolean) => {
      if (!open) form.reset()
    },
    [form],
  )

  const steps = useMemo(() => getRepetitionSteps(selectedDate), [selectedDate])
  return (
    <Sheet onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline">
          {/* <Plus className={cn(!isCollapsed ? 'mr-2' : 'w-4')} /> */}
          <PlusCircle />
          {/* {!isCollapsed && 'New block'} */}
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mb-3">Add new block</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Block title</FormLabel>
                  <Input
                    value={field.value}
                    placeholder="Enter block title"
                    onChange={field.onChange}
                  />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date of first repetition</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Button
                          type="button"
                          variant={'outline'}
                          className={cn(
                            'w-full pl-3 text-left font-normal',
                            !field.value && 'text-muted-foreground',
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, 'PPP')
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </div>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
            />

            <Ul className="my-0">
              {steps.map((date, idx) => {
                return (
                  <Li className="text-xs text-muted-foreground" key={idx}>
                    {format(date, 'MMMM dd, yyy, H:mm')}
                  </Li>
                )
              })}
            </Ul>

            <div className="flex gap-2">
              <Badge>english</Badge>
              <Badge>reading</Badge>
              <Badge>part 2</Badge>
            </div>
            <Separator className="mb-6 mt-6" />
            <SheetFooter>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel>Block description</FormLabel>
                    <Textarea
                      value={field.value}
                      className="block w-full mb-3"
                      placeholder="Type your description here."
                      onChange={field.onChange}
                    />
                    <Button type="submit">Create</Button>
                  </FormItem>
                )}
              />
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
