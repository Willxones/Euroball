import {DarkThemeToggle, Navbar } from "flowbite-react"

export default function Header() {
    return (
      <header className="sticky top-0 z-10">
      <Navbar fluid>
      <Navbar.Brand href="/">
        <img src="/eb.png" className="mr-3 h-6 sm:h-9" alt="Euroball Logo" />
      </Navbar.Brand>
      <div className="flex md:order-2">
        <DarkThemeToggle/>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active>Home</Navbar.Link>
        <Navbar.Link href="/news">News</Navbar.Link>
        <Navbar.Link href="#">Scores</Navbar.Link>
        <Navbar.Link href="#">Standings</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
    </header>
    );
}