'use client'
import { sidebarConfig } from '@/config/sidebar'
import { usePathname } from 'next/navigation'
import { SidebarLink } from './sidebar-link'

export function SidebarMenu() {
  const pathname = usePathname()

  return (
    <div className="overflow-y-auto">
      <SidebarLink href="/" highlight={pathname === '/'} icon="dot">All</SidebarLink>
      {sidebarConfig.map(link => (
        <SidebarLink key={link.link} href={link.link} highlight={pathname?.startsWith(`/${link.link}`)} icon={link.icon}>
          {link.name}
        </SidebarLink>
      ),
      )}
    </div>
  )
}
