import React, { ReactNode } from 'react';
// import { Header } from '@repo/components';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {/* Header (navbar) mounts once and stays during navigation) */}
      {/* <Header /> */}

      {/* Page content */}
      <main>{children}</main>
    </>
  );
};

export default Layout;
