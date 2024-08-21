import ReactGA from "react-ga4"

export default function PrivacyPolicy() {
    ReactGA.send({
        hitType: "pageview",
        page: `/privacy-policy`,
        title: `Privacy Policy`
      })
    return (
        <>
        <div className="mx-auto mt-10 max-w-lg dark:text-white">
            <h1 className="text-2xl font-bold">Privacy Policy</h1>
            <p>...</p>
        </div>
        </>
    )
}