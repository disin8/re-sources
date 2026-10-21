'use client'
import { usePathname } from 'next/navigation'
import { sidebarConfig } from '@/config/sidebar'
import { SidebarLink } from './sidebar-link'

export function SidebarMenu() {
  const pathname = usePathname()

  return (
    <div className="overflow-y-auto">
      <SidebarLink href="/" highlight={pathname === '/'} icon="dot">All</SidebarLink>
      {sidebarConfig.map(link => (
        <SidebarLink key={link.link} href={`/${link.link}`} highlight={pathname?.startsWith(`/${link.link}`)} icon={link.icon}>
          {link.name}
        </SidebarLink>
      ),
      )}
      <div className="my-3 border-t border-gray-100 dark:border-neutral-900" />
      <SidebarLink href="/collections" highlight={pathname?.startsWith('/collections')} icon="dot">
        Collections
      </SidebarLink>
      <SidebarLink href="/about" highlight={pathname?.startsWith('/about')} icon="dot">
        How we choose
      </SidebarLink>
    </div>
  )
}
