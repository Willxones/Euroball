import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home/index.js';
import Layout from './components/Layout.js';
import News from './pages/news/index.js';
import Article from './pages/article/index.js';

function App() {
  return (
    <main className='mx-auto max-w-7xl px-10'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path='/news' element={<News/>}/>
            <Route path='/article' element={<Article/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
