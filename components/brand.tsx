import Link from 'next/link'

export function Brand() {
  return (
    <Link className="px-[10px] py-2 border text-lg border-gray-400 border-dashed rounded-full w-max flex gap-[2px] leading-6 cursor-pointer transition-all duration-[.2s] ease-in-out hover:bg-gray-50 dark:hover:bg-neutral-800 hover:border-gray-600 dark:hover:border-neutral-800" href="/">
      <span className="uppercase font-aeonik">re</span>
      &#183;
      <span className="uppercase font-aeonik">sources</span>
    </Link>
  )
}
