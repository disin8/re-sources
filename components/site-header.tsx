import Link from 'next/link'

import { Brand } from './brand'
import { siteConfig } from '@/config/site'
import { buttonVariants } from '@/components/ui/button'
import { Icons } from '@/components/icons'
import { MainNav } from '@/components/main-nav'
import { ThemeToggle } from '@/components/theme-toggle'

export function SiteHeader() {
  return (
    <nav className="w-full fixed top-0 h-full max-h-[67px] z-20">
      <div className="h-[67px] absolute w-full top-0 left-0 flex justify-between items-center px-6 backdrop-blur-lg border-b border-gray-100 dark:border-neutral-900 bg-background/90">
        <Brand />
        <div className="w-full hidden lg:block">
          <div className="mr-auto lg:ml-6 w-full lg:max-w-[480px] lg:absolute relative group lg:top-[50%] lg:left-[50%] lg:-translate-x-[50%] lg:-translate-y-[50%] z-50">

          </div>
        </div>
        <div className="flex gap-2">

          <Link
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
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
        </div>
      </div>
    </nav>
  )
}
