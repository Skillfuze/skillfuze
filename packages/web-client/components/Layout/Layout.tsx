import React from 'react';
import Navbar from '../Navbar';
import { Footer } from '../Footer';

interface Props {
  children?: React.ReactNode;
  navControls?: React.ReactNode;
}

const Layout: React.FC<Props> = (props: Props) => (
  <div className="flex flex-col min-h-screen">
    <Navbar controls={props.navControls} />
    {props.children}
    <div className="flex flex-row w-full h-12 bg-primary items-center ">
      <Footer />
    </div>
  </div>
);

export default Layout;
