import { Footer } from "flowbite-react";

export default function PageFooter() {
    return(
        <section className="sticky top-[100vh]">
        <Footer container>
      <Footer.Copyright href="#" by="EuroBall" year={2024} />
      <Footer.LinkGroup>
        <Footer.Link href="/about">About</Footer.Link>
        <Footer.Link href="/contact">Contact</Footer.Link>
        <Footer.Link href="/privacy-policy">Privacy Policy</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
    </section>
    )
}