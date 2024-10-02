import { Footer } from "flowbite-react";

export default function PageFooter() {
    return(
      <>
        <section className="mt-2 dark:hidden">
        <Footer className="shadow-none" container>
        <Footer.Brand src="/DarkRegLogo.png" className="h-5"/>
      <Footer.LinkGroup>
        <Footer.Link href="/about">About</Footer.Link>
        <Footer.Link href="/contact">Contact</Footer.Link>
        <Footer.Link href="/privacy-policy">Privacy Policy</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
    </section>

<section className="mt-2 hidden dark:block">
<Footer className="shadow-none" container>
<Footer.Brand src="/LightRegLogo.png" className="h-5"/>
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