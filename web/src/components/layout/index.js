import React from 'react';
import Footer from '../footer';
import ProjectHeader from '../projectHeader';

const Layout = ({ children, isProjectPage }) => (
  <>
    {isProjectPage && <ProjectHeader />}
    <div>{children}</div>
    <Footer />
  </>
);

export default Layout;
