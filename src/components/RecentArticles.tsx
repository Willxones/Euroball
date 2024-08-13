import { Card } from "flowbite-react"

export default function RecentArticles() {
    return(
        <section className="mt-3 flex flex-col gap-12 lg:flex-row">
            <Card className="mx-auto max-w-sm" imgSrc="https://cdn-liveutv.pressidium.com/wp-content/uploads/2023/07/European-League-of-Football-ELF-1024x768.jpg" horizontal>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Noteworthy technology acquisitions 2021
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
      </p>
    </Card>
    <Card className="mx-auto max-w-sm" imgSrc="https://admin.europeanleague.football/_default_upload_bucket/3822/image-thumb__3822___auto_db149ca27ea780f9a1c401b107c0c12a/MarvinContessi_2023_RHFatHSD067%281%29.webp" horizontal>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Noteworthy technology acquisitions 2021
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
      </p>
    </Card>
        </section>
    )
}
