'use client'

import type { LinkProps } from 'next/link'
import { Icons } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { sidebarConfig } from '@/config/sidebar'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import * as React from 'react'
import { Brand } from './brand'
import { CommandMenu } from './command-menu'
import { SidebarFooter } from './sidebar-footer'
import { SidebarLink } from './sidebar-link'
import { ScrollArea } from './ui/scroll-area'

export function MobileSidebar() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Icons.menu width={14} height={14} />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-screen p-6 top-0 right-0 left-auto mt-0 w-full max-w-96 rounded-none">
        <Link
          href="/"
          className="flex items-center"
          onClick={() => setOpen(false)}
        >
          <Brand />
        </Link>
        <CommandMenu />
        <ScrollArea className="mt-2 mb-4 h-[calc(100dvh-20rem)] pb-8">
          <div className="flex flex-col">
            <MobileLink
              href="/"
              onOpenChange={setOpen}
              icon="dot"
              highlight={pathname === '/'}
            >
              All
            </MobileLink>
            {sidebarConfig.map(
              item =>
                item.link && (
                  <MobileLink
                    key={item.link}
                    href={item.link}
                    onOpenChange={setOpen}
                    icon={item.icon}
                    highlight={pathname?.startsWith(`/${item.link}`)}
                  >
                    {item.name}
                  </MobileLink>
                ),
            )}
          </div>
        </ScrollArea>
        <SidebarFooter />
      </DrawerContent>
    </Drawer>
  )
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
  highlight: boolean
  icon: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter()
  return (
    <SidebarLink
      href={href}
      onClick={() => {
        router.push(href.toString())
        onOpenChange?.(false)
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </SidebarLink>
  )
}
