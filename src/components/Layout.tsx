import { Outlet } from "react-router-dom";
import Header from "./Header";
import PageFooter from "./PageFooter";
import CookieConsent, {
  Cookies,
} from "react-cookie-consent";
import ReactGA from "react-ga4";

export default function Layout() {
  const handleAcceptCookie = () => {
    const trackingId = process.env.GA_TRACKING_ID;
    if (trackingId) {
      ReactGA.initialize(trackingId);
    }
  };

  const handleDeclineCookie = () => {
    // Remove Google Analytics cookies
    Cookies.remove("_ga");
    Cookies.remove("_gat");
    Cookies.remove("_gid");
  };
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Header />
        <CookieConsent
          enableDeclineButton
          declineButtonStyle={{ fontSize: "13px", borderRadius: "4px" }}
          onDecline={handleDeclineCookie}
          location="bottom"
          buttonText="Allow cookies"
          cookieName="EuroballCookie"
          style={{ background: "#fff" }}
          buttonStyle={{
            color: "#fff",
            fontSize: "13px",
            backgroundColor: "#1f2937",
            borderRadius: "4px",
          }}
          expires={150}
          onAccept={handleAcceptCookie}
        >
          <span className="text-black">
            This website uses cookies to enhance the user experience.{" "}
          </span>
          <span style={{ fontSize: "10px" }} className="text-black">
            See our{" "}
            <a className="font-bold text-blue-800" href="/privacy-policy">
              privacy policy
            </a>{" "}
            for more information.{" "}
          </span>
        </CookieConsent>
        <Outlet />
        <PageFooter />
      </div>
    </>
  );
}
