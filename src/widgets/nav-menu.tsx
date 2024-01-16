import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
  type LucideIcon,
} from 'lucide-react'
import Link from 'next/link'

import { buttonVariants } from '@/shared/components/ui/button'
import { Separator } from '@/shared/components/ui/separator'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/shared/components/ui/tooltip'
import { cn } from '@/shared/lib'

import { ModeToggle } from './mode-toggle'

interface NavProps {
  isCollapsed: boolean
  links: {
    title: string
    label?: string
    icon: LucideIcon
    variant: 'default' | 'ghost'
  }[]
}

export function Nav({ isCollapsed, links }: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className={cn(
                    buttonVariants({
                      variant: link.variant as 'default' | 'ghost',
                      size: 'icon',
                    }),
                    'h-9 w-9',
                    link.variant === 'default' &&
                      'dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white',
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {link.title}
                {link.label && (
                  <span className="ml-auto text-muted-foreground">
                    {link.label}
                  </span>
                )}
              </TooltipContent>
            </Tooltip>
          ) : (
            <Link
              key={index}
              href="#"
              className={cn(
                buttonVariants({
                  variant: link.variant as 'default' | 'ghost',
                  size: 'sm',
                }),
                link.variant === 'default' &&
                  'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                'justify-start',
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && (
                <span
                  className={cn(
                    'ml-auto',
                    link.variant === 'default' &&
                      'text-background dark:text-white',
                  )}
                >
                  {link.label}
                </span>
              )}
            </Link>
          ),
        )}
      </nav>
    </div>
  )
}

export const NavMenu = ({ isCollapsed }: { isCollapsed: boolean }) => {
  return (
    <>
      <div className="h-[52px] border-b flex justify-start items-center px-2">
        <ModeToggle />
      </div>
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: 'Inbox',
            label: '128',
            icon: Inbox,
            variant: 'default',
          },
          {
            title: 'Drafts',
            label: '9',
            icon: File,
            variant: 'ghost',
          },
          {
            title: 'Sent',
            label: '',
            icon: Send,
            variant: 'ghost',
          },
          {
            title: 'Junk',
            label: '23',
            icon: ArchiveX,
            variant: 'ghost',
          },
          {
            title: 'Trash',
            label: '',
            icon: Trash2,
            variant: 'ghost',
          },
          {
            title: 'Archive',
            label: '',
            icon: Archive,
            variant: 'ghost',
          },
        ]}
      />
      <Separator />
      <Nav
        isCollapsed={isCollapsed}
        links={[
          {
            title: 'Social',
            label: '972',
            icon: Users2,
            variant: 'ghost',
          },
          {
            title: 'Updates',
            label: '342',
            icon: AlertCircle,
            variant: 'ghost',
          },
          {
            title: 'Forums',
            label: '128',
            icon: MessagesSquare,
            variant: 'ghost',
          },
          {
            title: 'Shopping',
            label: '8',
            icon: ShoppingCart,
            variant: 'ghost',
          },
          {
            title: 'Promotions',
            label: '21',
            icon: Archive,
            variant: 'ghost',
          },
        ]}
      />
    </>
  )
}
