import React from 'react';
import Header from './Header';
import Footer from './Footer';
import RecentlyViewedArticles from './RecentlyViewedArticles';

const Layout = ({ children }) => {
  return (
    <>
    <main className='max-w-7xl mx-auto sm:px-10 px-5'>
      <Header/>
      {children}
      <RecentlyViewedArticles/>
      <Footer/>
    </main>
    </>
  );
}

export default Layout;