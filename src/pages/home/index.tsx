import ReactGA from "react-ga4"

export default function Home() {
    ReactGA.send({
        hitType: "pageview",
        page: `/`,
        title: `Home`
      })
    return (
        <>
        Home
        </>
    )
}