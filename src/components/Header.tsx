import { DarkThemeToggle, Navbar } from 'flowbite-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthProvider';
import { UserIcon } from '@heroicons/react/20/solid';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const authContext = useContext(AuthContext);

  const { user, logOut, loading } = authContext;

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-10">
      <Navbar fluid>
        <Navbar.Brand href="/">
          <img src="/DarkRegLogo.png" className="mr-2 h-6 dark:hidden sm:h-9" alt="Euroball Logo" />
          <img src="/LightRegLogo.png" className="mr-2 hidden h-6 dark:block sm:h-9" alt="Euroball Logo" />
        </Navbar.Brand>
        <div className="ml-2 flex md:order-2">
          {user ? (
            <>
              <button className='my-1 mr-2 hidden rounded-full bg-gray-800 px-1 text-sm font-semibold text-white dark:bg-white dark:text-gray-800 dark:hover:bg-gray-300 md:block' onClick={() => navigate("/account")}><UserIcon width={25}/></button>
            </>
          ) : (
            <button className='my-1 mr-2 hidden rounded-full bg-gray-800 px-4 text-sm font-semibold text-white dark:bg-white dark:text-gray-800 dark:hover:bg-gray-300 md:block' onClick={() => navigate("/login")}>Login</button>
          )}
          <DarkThemeToggle />
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link href="/" active={isActive('/')}>Home</Navbar.Link>
          <Navbar.Link href="/news" active={isActive('/news')}>News</Navbar.Link>
          <Navbar.Link href="/scores" active={isActive('/scores')}>Scores</Navbar.Link>
          <Navbar.Link href="/standings" active={isActive('/standings')}>Standings</Navbar.Link>
          <Navbar.Link href="/feedback" active={isActive('/feedback')}>Feedback</Navbar.Link>
          <Navbar.Link className='font-bold md:hidden' href={user ? '/account' : '/login'} active={isActive('/login')}>{user ? (<>Account</>) : (<>Login</>)}</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}