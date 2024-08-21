import LeaguePicker from "./LeaguePicker";
import ReactGA from "react-ga4"

export default function Scores() {
    ReactGA.send({
        hitType: "pageview",
        page: `/scores`,
        title: `Scores`
      })
    return (
        <>
        <LeaguePicker/>
        </>
    )
}