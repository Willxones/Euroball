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
          <img src="/DarkRegLogo.png" className="mr-2 h-6 dark:hidden sm:h-9" alt="Euroball Logo" />
          <img src="/LightRegLogo.png" className="mr-2 hidden h-6 dark:block sm:h-9" alt="Euroball Logo" />
        </Navbar.Brand>
        <div className="ml-2 flex md:order-2">
          <DarkThemeToggle />
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/" active={isActive('/')}>Home</Navbar.Link>
          <Navbar.Link href="/news" active={isActive('/news')}>News</Navbar.Link>
          <Navbar.Link href="/scores" active={isActive('/scores')}>Scores</Navbar.Link>
          <Navbar.Link href="/standings" active={isActive('/standings')}>Standings</Navbar.Link>
          <Navbar.Link href="/feedback" active={isActive('/feedback')}>Feedback</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}
