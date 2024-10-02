import LeaguePicker from "./LeaguePicker";
import ReactGA from "react-ga4";

export default function News() {
  ReactGA.send({
    hitType: "pageview",
    page: `/news`,
    title: `News`,
  });
  return (
    <>
      <LeaguePicker />
    </>
  );
}
