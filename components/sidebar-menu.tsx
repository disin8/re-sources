'use client'
import { usePathname } from 'next/navigation'
import { SidebarLink } from './sidebar-link'
import { sidebar } from '@/config/sidebar'

export function SidebarMenu() {
  const pathname = usePathname()

  return (
    <div className="overflow-y-auto">
      <SidebarLink href="/" highlight={pathname === '/'} icon="dot">All</SidebarLink>
      {sidebar.map(link => (
        <SidebarLink key={link.link} href={link.link} highlight={pathname?.startsWith(`/${link.link}`)} icon={link.icon}>
          {link.name}
        </SidebarLink>
      ),
      )}
    </div>
  )
}
