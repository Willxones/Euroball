import { Footer } from "flowbite-react";

export default function PageFooter() {
  return (
    <>
      <section className="mt-auto dark:hidden">
        <Footer container className="shadow-none">
          <Footer.Brand src="/DarkRegLogo.png" className="h-5" />
          <Footer.LinkGroup>
            <Footer.Link href="/about">About</Footer.Link>
            <Footer.Link href="/contact">Contact</Footer.Link>
            <Footer.Link href="/privacy-policy">Privacy Policy</Footer.Link>
          </Footer.LinkGroup>
        </Footer>
      </section>

      <section className="mt-auto hidden dark:block">
        <Footer container className="shadow-none">
          <Footer.Brand src="/LightRegLogo.png" className="h-5" />
          <Footer.LinkGroup>
            <Footer.Link href="/about">About</Footer.Link>
            <Footer.Link href="/contact">Contact</Footer.Link>
            <Footer.Link href="/privacy-policy">Privacy Policy</Footer.Link>
          </Footer.LinkGroup>
        </Footer>
      </section>
    </>
  );
}
