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
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
  {/* About Us Section */}
  <div className="mb-12">
    <h1 className="text-4xl font-extrabold">About Us</h1>
  </div>

  {/* Main Section */}
  <div className="mb-12">
    <h2 className="text-3xl font-bold">What is euroball?</h2>
    <p className="mt-4 text-lg">
      Euroball is a media hub for all things American football around the world, primarily around Europe. Whether it’s news, scores, or highlights, euroball aims to bring a spotlight over the sport on a global level, keeping fans of the sport in the loop of their favorite leagues.
    </p>
  </div>

  {/* Why Us Section */}
  <div className="py-8">
    <h2 className="text-3xl font-bold">Why Us?</h2>
    <p className="mt-4 text-lg">
      With 14 years of playing experience between our two co-founders, and other valuable experience in the industry, the lack of consistent, high-quality media coverage of the sport around Europe has been very evident, and something we set out to change with euroball.
    </p>
    <p className="mt-4 text-lg">
      We aim to grow the game as we grow our brand across multiple media platforms, with plans to expand with more products in the future.
    </p>
    <p className="mt-4 text-lg">
      We hope you enjoy our content, and don’t hesitate to provide any feedback, positive or negative!
    </p>
  </div>

  {/* Get Involved Section */}
  <div className="py-8">
    <h2 className="text-3xl font-bold">Get Involved</h2>
    <p className="mt-4 text-lg">
      If you’re an aspiring writer, content creator, or developer, be sure to <a className="text-blue-600" href="/contact">contact us</a> to get involved in our journey!
    </p>
  </div>
</div>

        </div>
        </>
    )
}