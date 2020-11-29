import { ReactNode } from 'react';
import NavBar from './NavBar';

interface PropTypes {
  children: ReactNode;
}

const Layout = ({ children }: PropTypes) => (
  <>
    <NavBar />
    <main className="container mx-auto py-4">{children}</main>
  </>
);

export default Layout;
