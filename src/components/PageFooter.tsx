import { Footer } from "flowbite-react";

export default function PageFooter() {
    return(
        <section>
        <Footer container>
      <Footer.Copyright href="#" by="EuroBall" year={2024} />
      <Footer.LinkGroup>
        <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
    </section>
    )
}