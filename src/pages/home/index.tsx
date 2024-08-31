import ReactGA from "react-ga4"
import FeaturedNewsSection from "./FeaturedNewsSection"
import RecentScoresSection from "./RecentScoresSection"
import RecentNewsSection from "./RecentNewsSection"
import Standings from "../standings"

export default function Home() {
    ReactGA.send({
        hitType: "pageview",
        page: `/`,
        title: `Home`
      })
    return (
        <>
        <FeaturedNewsSection/>
        <RecentScoresSection/>
        <RecentNewsSection isSidebar={false} currentArticleId={undefined}/>
        <div className="my-4">
        <h2 className="text-lg font-bold dark:text-white">Standings ⚔️</h2>
        <Standings/>
        </div>
        </>
    )
}