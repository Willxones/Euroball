import { Footer } from "flowbite-react";

export default function PageFooter() {
    return(
      <>
        <section className="mt-2 dark:hidden">
        <Footer container>
        <Footer.Brand src="/DarkRegLogo.png"/>
      <Footer.LinkGroup>
        <Footer.Link href="/about">About</Footer.Link>
        <Footer.Link href="/contact">Contact</Footer.Link>
        <Footer.Link href="/privacy-policy">Privacy Policy</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
    </section>

<section className="mt-2 hidden dark:block">
<Footer container>
<Footer.Brand src="/LightRegLogo.png"/>
<Footer.LinkGroup>
<Footer.Link href="/about">About</Footer.Link>
<Footer.Link href="/contact">Contact</Footer.Link>
<Footer.Link href="/privacy-policy">Privacy Policy</Footer.Link>
</Footer.LinkGroup>
</Footer>
</section>
</>
    )
}