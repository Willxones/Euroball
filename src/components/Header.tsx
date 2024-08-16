import { DarkThemeToggle, Navbar } from 'flowbite-react';
import { useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  // Determine the active route
  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-10">
      <Navbar fluid>
        <Navbar.Brand href="/">
          <img src="/eb.png" className="mr-3 h-6 sm:h-9" alt="Euroball Logo" />
        </Navbar.Brand>
        <div className="flex md:order-2">
          <DarkThemeToggle />
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/" active={isActive('/')}>Home</Navbar.Link>
          <Navbar.Link href="/news" active={isActive('/news')}>News</Navbar.Link>
          <Navbar.Link href="/scores" active={isActive('/scores')}>Scores</Navbar.Link>
          <Navbar.Link href="" active={isActive('/standings')}>Standings</Navbar.Link>
          <Navbar.Link href="" active={isActive('feedback')}>Feedback</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
