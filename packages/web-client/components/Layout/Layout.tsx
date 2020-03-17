import React from 'react';
import Navbar from '../Navbar';

interface Props {
  children?: React.ReactNode;
  navControls?: React.ReactNode;
}

const Layout: React.FC<Props> = (props: Props) => (
  <div className="flex flex-col min-h-screen">
    <Navbar controls={props.navControls} />
    {props.children}
  </div>
);

export default Layout;
