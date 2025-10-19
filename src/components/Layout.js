import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="page-content">
        <Outlet /> {/* This will render the specific page content (Homepage, Filaments, etc.) */}
      </main>
      {/* You could add a <Footer /> here in the future */}
    </>
  );
};

export default Layout;
