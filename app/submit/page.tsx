import type { Metadata } from 'next'
import { SubmitForm } from '@/components/submit-form'
import { absoluteUrl } from '@/config/site'

export const metadata: Metadata = {
  title: 'Submit a resource',
  description:
    'Suggest a design tool or resource for the re • sources catalog. Submissions are reviewed weekly and need a name, URL, one-line description and license.',
  alternates: {
    canonical: '/submit',
  },
  openGraph: {
    title: 'Submit a resource — re • sources',
    description: 'Suggest a design tool for the catalog. Submissions are reviewed weekly.',
    url: absoluteUrl('/submit'),
    type: 'article',
  },
}

export default function SubmitPage() {
  return (
    <section className="h-full w-full p-6 max-w-[640px]">
      <h1 className="font-semibold text-2xl md:text-3xl leading-9 px-3">Submit a resource</h1>
      <p className="px-3 pt-3 text-sm text-gray-500 dark:text-neutral-400 leading-7">
        Found a tool that belongs in the catalog? Fill in the form below — it opens a prefilled GitHub issue so the submission
        lands straight in the review queue. Every submission is checked for a working link, a stated license and a clear price
        before it is published.
      </p>

      <div className="px-3 pt-6">
        <SubmitForm />
      </div>
    </section>
  )
}
