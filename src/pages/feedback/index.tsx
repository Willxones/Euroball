import { Button, Textarea } from "flowbite-react";
import ReactGA from "react-ga4";

export default function Feedback() {
  ReactGA.send({
    hitType: "pageview",
    page: `/feedback`,
    title: `Feedback`,
  });
  return (
    <>
      <form
        action={`https://formsubmit.co/${process.env.EMAIL_ADDRESS}`}
        method="POST"
      >
        <div className="mx-auto mt-10 max-w-lg">
          <div className="dark:text-white">
            <h1 className="text-2xl font-semibold">Leave us some feedback</h1>
            <p className="mb-2 text-xs text-gray-400 sm:text-lg">
              We want to hear from you! If you have any thoughts on the website,
              what could be improved, what features you would like to see, etc.
              please get in touch to let us know. Every suggestion will be
              considered as we look to continuously improve our services.
            </p>
          </div>
          <Textarea
            id="comment"
            name="feedback"
            placeholder="Leave a comment..."
            maxLength={1000}
            required
            rows={4}
          />
          <Button className="my-4 w-full" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </>
  );
}
