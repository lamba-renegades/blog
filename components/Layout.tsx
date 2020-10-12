import { ReactNode } from 'react';
import NavBar from './NavBar';

interface PropTypes {
  children: ReactNode;
}

const Layout = ({ children }: PropTypes) => (
  <>
    <header className="bg-indigo-800">
      <div className="container mx-auto">
        <NavBar />
        Imagen de lambda renegades...
      </div>
    </header>
    <main className="container mx-auto py-4">{children}</main>
  </>
);

export default Layout;
