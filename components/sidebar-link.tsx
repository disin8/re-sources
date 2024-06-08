import Link, { type LinkProps } from 'next/link'
import { Icons } from './icons'
import { cn } from '@/lib/utils'

interface SidebarLinkProps extends LinkProps {
  highlight: boolean
  icon: string
  children: React.ReactNode
  className?: string
}

export function SidebarLink({ href, highlight, icon, children, className, ...props }: SidebarLinkProps) {
  const Icon = Icons[icon as keyof typeof Icons]
  return (
    <Link
      {...props}
      href={href}
      className={cn(className)}
    >
      <div className="w-full flex gap-3 items-center px-3 py-2 rounded-lg cursor-pointer text-black group transition-colors relative z-0">
        <div className={cn('[&amp;>svg]:w-[20px] [&amp;>svg]:h-[20px] sm:[&amp;>svg]:h-[14px] sm:[&amp;>svg]:w-[14px] h-[20px] w-[20px] sm:w-[14px] sm:h-[14px] text-gray-300 dark:text-gray-300/50 override-svg-color group-hover:text-black dark:group-hover:text-white group-hover:opacity-100 transition z-10', highlight && 'text-black dark:text-white',
        )}
        >
          <Icon width={14} height={14} />
        </div>
        <span className="text-black dark:text-white text-base sm:text-sm select-none z-10">{children}</span>
        {highlight && <div className="bg-gray-100 dark:bg-neutral-900 rounded-lg w-full h-full absolute top-0 left-0 z-0" style={{ opacity: 1 }}></div>}
      </div>
    </Link>
  )
}
