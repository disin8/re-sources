import Link from 'next/link'

import { Brand } from './brand'
import { CommandMenu } from './command-menu'
import { siteConfig } from '@/config/site'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { ThemeToggle } from '@/components/theme-toggle'
import { MobileSidebar } from '@/components/mobile-sidebar'

export function SiteHeader() {
  return (
    <nav className="w-full fixed top-0 h-full max-h-[66px] z-20">
      <div className="h-[66px] absolute w-full top-0 left-0 flex justify-between items-center px-6 backdrop-blur-lg border-b border-gray-100 dark:border-neutral-900 bg-background/80">
        <Brand />
        <div className="relative w-full hidden md:block">
          <div className="mx-auto text-center w-full md:max-w-[480px] relative group md:absolute md:top-[50%] md:left-[50%] md:-translate-x-[50%] md:-translate-y-[50%] z-50">
            <CommandMenu />
          </div>
        </div>
        <div className="flex gap-2">

          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex"
          >
            <div
              className={buttonVariants({
                size: 'icon',
                variant: 'ghost',
              })}
            >
              <Icons.gitHub width={14} height={14} />
              <span className="sr-only">GitHub</span>
            </div>
          </Link>
          <ThemeToggle />
          <MobileSidebar />
        </div>
      </div>
    </nav>
  )
}
