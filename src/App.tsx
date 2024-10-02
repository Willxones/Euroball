import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/index.js';
import Layout from './components/Layout.js';
import News from './pages/news/index.js';
import Article from './pages/article/index.js';
import Scores from './pages/scores/index.js';
import Standings from './pages/standings/index.js';
import Feedback from './pages/feedback/index.js';
import About from './pages/other/About.js';
import PrivacyPolicy from './pages/other/PrivacyPolicy.js';
import Contact from './pages/other/Contact.js';
import AuthProvider from './components/AuthProvider.js';
import { Login } from './pages/auth/Login.js';
import { Register } from './pages/auth/Register.js';
import { PasswordReset } from './pages/auth/PasswordReset.js';
import Account from './pages/auth/Account.js';

function App() {
  return (
    <AuthProvider>
    <main className='mx-auto min-h-screen max-w-7xl px-5 sm:px-10'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='/news' element={<News/>}/>
            <Route path='/article/:id' element={<Article/>}/>
            <Route path='/scores' element={<Scores/>}/>
            <Route path='/standings' element={<Standings/>}/>
            <Route path='/feedback' element={<Feedback/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/privacy-policy' element={<PrivacyPolicy/>}/>
            <Route path='/contact' element={<Contact/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/password-reset' element={<PasswordReset/>}/>
            <Route path='/account' element={<Account/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
    </AuthProvider>
  );
}

export default App;
