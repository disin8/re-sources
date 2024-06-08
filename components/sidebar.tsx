import { SidebarFooter } from './sidebar-footer'
import { SidebarMenu } from './sidebar-menu'

export function Sidebar() {
  return (
    <aside className="w-full border-r border-gray-100 dark:border-neutral-900 flex-col justify-between bg-background p-4 max-w-[250px] h-[calc(100svh-149px)] md:h-[calc(100svh-66px)] hidden md:flex fixed top-[66px]">
      <SidebarMenu />
      <SidebarFooter />
    </aside>
  )
}
