import Link from 'next/link'

export default function IndexPage() {
  return (
    <section className="h-full w-full">
      <h1 className="font-semibold text-2xl leading-9 px-3">All</h1>
      <div
        className="w-full grid gap-x-4 gap-y-6 md:grid-cols-2 lg:grid-cols-3 mt-8 pb-[80px]"
      >
        <Link href="#">
          <div
            className="group p-3 transition-all rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-900 hover:scale-101 active:scale-99 ease-in-out"
          >
            <div
              className="relative overflow-hidden rounded-md border border-gray-100 dark:border-neutral-900 select-none aspect-video"
            >
            </div>
            <div className="mt-2 flex items-center w-full">
              <div
                className="flex items-start h-full w-full gap-2"
              >
                <div className="w-full">
                  <p
                    className="text-sm text-gray-1000 leading-5"
                  >
                    One
                  </p>
                  <p
                    className="text-sm text-gray-400 leading-5"
                  >
                    First item
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}
