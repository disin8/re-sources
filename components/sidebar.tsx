'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icons } from './icons'
import { SidebarFooter } from './sidebar-footer'
import { sidebar } from '@/config/sidebar'
import { cn } from '@/lib/utils'

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-full border-r border-gray-100 dark:border-neutral-900 flex-col justify-between bg-background p-4 max-w-[250px] h-[calc(100svh-149px)] md:h-[calc(100svh-66px)] hidden md:flex fixed top-[66px]">
      <div className="overflow-y-auto">
        <Link href="/">
          <div className="w-full flex gap-3 items-center px-3 py-2 rounded-lg cursor-pointer text-black group transition-colors relative z-0">
            <div className={cn('[&amp;>svg]:w-[20px] [&amp;>svg]:h-[20px] sm:[&amp;>svg]:h-[14px] sm:[&amp;>svg]:w-[14px] h-[20px] w-[20px] sm:w-[14px] sm:h-[14px] text-gray-300 dark:text-gray-300/50 override-svg-color group-hover:text-black dark:group-hover:text-white group-hover:opacity-100 transition z-10', pathname === '/' && 'text-black dark:text-white',
            )}
            >
              <Icons.dot width={14} height={14} />
            </div>
            <span className="text-black dark:text-white text-base sm:text-sm select-none z-10">All</span>
            {pathname === '/' && <div className="bg-gray-100 dark:bg-neutral-900 rounded-lg w-full h-full absolute top-0 left-0 z-0" style={{ opacity: 1 }}></div>}
          </div>
        </Link>
        {sidebar.map((link) => {
          const Icon = Icons[link.icon as keyof typeof Icons]
          return (
            <Link href={link.link} key={link.link}>
              <div className="w-full flex gap-3 items-center px-3 py-2 rounded-lg cursor-pointer text-black group transition-colors relative z-0">
                <div className={cn('[&amp;>svg]:w-[20px] [&amp;>svg]:h-[20px] sm:[&amp;>svg]:h-[14px] sm:[&amp;>svg]:w-[14px] h-[20px] w-[20px] sm:w-[14px] sm:h-[14px] text-gray-300 dark:text-gray-300/50 override-svg-color group-hover:text-black dark:group-hover:text-white group-hover:opacity-100 transition z-10', pathname?.startsWith(`/${link.link}`) && 'text-black dark:text-white',
                )}
                >
                  <Icon width={14} height={14} />
                </div>
                <span className="text-black dark:text-white text-base sm:text-sm select-none z-10">{link.name}</span>
                {pathname?.startsWith(`/${link.link}`) && <div className="bg-gray-100 dark:bg-neutral-900 rounded-lg w-full h-full absolute top-0 left-0 z-0" style={{ opacity: 1 }}></div>}
              </div>
            </Link>
          )
        })}
      </div>
      <SidebarFooter />
    </aside>
  )
}
