import { Button, Label, Textarea, TextInput } from "flowbite-react";
import ReactGA from "react-ga4"

export default function Contact() {
  ReactGA.send({
    hitType: "pageview",
    page: `/contact`,
    title: `Contact`
  })
    return (
        <>
        <form action={`https://formsubmit.co/${process.env.EMAIL_ADDRESS}`} method="POST" >
        <div className="mx-auto mt-10 max-w-lg dark:text-white">
            <h1 className="text-2xl font-bold">Contact us</h1>
            <p className="mb-2 text-xs text-gray-400 sm:text-lg">Use this form to get in touch with us. We'll do our best to reply as quickly as possible.</p>
            <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput id="email1" type="email" placeholder="email@123.com" required />
        <div className="my-2 block">
        <Label htmlFor="comment" value="Your message" />
      </div>
      <Textarea id="comment" placeholder="Leave a comment..." maxLength={1000} required rows={4} />
      <Button className="my-4 w-full" type="submit">Submit</Button>
      </div>
      </form>
        </>
    )
}