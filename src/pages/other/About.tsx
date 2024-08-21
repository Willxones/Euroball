import ReactGA from "react-ga4"

export default function About() {
    ReactGA.send({
        hitType: "pageview",
        page: `/about`,
        title: `About`
      })
    return (
        <>
        <div className="mx-auto mt-10 max-w-lg dark:text-white">
            <h1 className="text-2xl font-bold">About Euroball</h1>
            <p>Euroball is ...</p>
        </div>
        </>
    )
}