import Link from 'next/link'
import { Button } from './ui/button'
import { Icons } from './icons'
import { siteConfig } from '@/config/site'

export function SidebarFooter() {
  return (
    <div className="w-full pt-2 flex items-center flex-col gap-2 bg-background text-gray-600 dark:text-neutral-400 text-sm">
      <div className="w-full flex gap-4">
        <Button className="w-full justify-between" asChild variant="outline">
          <Link href={siteConfig.links.github}>
            GitHub
            <Icons.external width="14px" height="14px" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={siteConfig.links.twitter}>
            <Icons.twitter width="14px" height="14px" />
          </Link>
        </Button>
      </div>
      <Button className="w-full justify-between" asChild variant="outline">
        <Link href="mailto:hi@re-sources.com">
          hi@re-sources.com
          <Icons.mail width="14px" height="14px" />
        </Link>
      </Button>
      <span className="text-sm text-gray-400 leading-5">© 2024 re • sources</span>
    </div>
  )
}
