import React from 'react';
import Head from 'next/head';

import Navbar from '../Navbar';
import { Footer } from '../Footer';

interface Props {
  children?: React.ReactNode;
  navControls?: React.ReactNode;
  title?: string;
}

const Layout: React.FC<Props> = (props: Props) => (
  <div className="flex flex-col min-h-screen">
    <Head>
      <title>{props.title ? `${props.title} - Skillfuze` : 'Skillfuze'}</title>
    </Head>
    <Navbar controls={props.navControls} />
    {props.children}
    <div className="flex flex-row w-full h-12 bg-primary items-center ">
      <Footer />
    </div>
  </div>
);

export default Layout;
