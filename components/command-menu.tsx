'use client'

import type { DialogProps } from '@radix-ui/react-dialog'
import type { IContent } from '@/types/content'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { sidebarConfig } from '@/config/sidebar'
import { contentLinks, getCollections } from '@/content'
import { cn } from '@/lib/utils'
import { Icons } from './icons'
import { Button } from './ui/button'

const priceLabels: Record<IContent['price'], string> = {
  free: 'Free',
  freemium: 'Freemium',
  paid: 'Paid',
  subscription: 'Subscription',
}

export function CommandLink({ name, price, description, url, tags }: Pick<IContent, 'name' | 'description' | 'url' | 'tags' | 'price'>) {
  return (
    <CommandItem
      value={name}
      keywords={[priceLabels[price], description, ...(tags || [])]}
      asChild
      className="cursor-pointer"
    >
      <Link href={url} target="_blank" rel="noopener noreferrer" className="group flex flex-row justify-between">
        <span>
          <span>
            {name}
            {' '}
            <span className="text-gray-600 dark:text-neutral-400 overflow-hidden">{description}</span>
          </span>
          <span className="flex gap-0.5 flex-wrap overflow-hidden mt-1">
            <span className="text-white font-light relative text-sm backdrop-blur-sm bg-[var(--brand-solid)] dark:bg-white/15 rounded-lg inline-block px-1 py-0.5">
              {priceLabels[price]}
            </span>
            {tags?.slice(0, 3).map(tag => (
              <span key={tag} className="text-white font-light relative text-sm backdrop-blur-sm bg-[var(--brand-solid)]/85 dark:bg-white/15 rounded-lg inline-block px-1 py-0.5">
                {tag}
              </span>
            ))}
          </span>
        </span>
        <Icons.external className="opacity-50 group-hover:opacity-100 min-h-4 min-w-4" />
      </Link>
    </CommandItem>
  )
}

export function CommandMenu({ ...props }: DialogProps) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const collections = getCollections()

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || e.key === '/') {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable)
          || e.target instanceof HTMLInputElement
          || e.target instanceof HTMLTextAreaElement
          || e.target instanceof HTMLSelectElement
        ) {
          return
        }

        e.preventDefault()
        setOpen(open => !open)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const runCommand = React.useCallback((command: () => unknown) => {
    setOpen(false)
    command()
  }, [])

  return (
    <>
      <Button
        variant="outline"
        className={cn(
          'my-3 relative h-8 w-full justify-start rounded-2xl bg-background text-sm font-normal text-gray-600 dark:text-neutral-400 hover:text-black dark:hover:text-white shadow-none sm:pr-12 md:w-80 lg:w-full',
        )}
        onClick={() => setOpen(true)}
        {...props}
      >
        <span>Search resources...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] h-5 select-none items-center gap-1 rounded-2xl border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>
          K
        </kbd>
      </Button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
      >
        <CommandInput placeholder="Search by name, use case or tag..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Resources">
            {Object.values(contentLinks).flat(1).map(link => (
              <CommandLink
                key={link.slug}
                name={link.name}
                description={link.description}
                price={link.price}
                url={link.url}
                tags={link.tags}
              />
            ))}
          </CommandGroup>
          <CommandGroup heading="Categories">
            {sidebarConfig
              .map(navItem => (
                <CommandItem
                  key={navItem.link}
                  value={navItem.name}
                  onSelect={() => {
                    runCommand(() => router.push(`/${navItem.link}`))
                  }}
                >
                  <Icons.circleDashed className="mr-2 h-4 w-4" />
                  {navItem.name}
                </CommandItem>
              ))}
          </CommandGroup>
          <CommandGroup heading="Collections">
            {collections.map(collection => (
              <CommandItem
                key={collection.slug}
                value={collection.title}
                onSelect={() => {
                  runCommand(() => router.push(`/collections/${collection.slug}`))
                }}
              >
                <Icons.circleDashed className="mr-2 h-4 w-4" />
                {collection.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
