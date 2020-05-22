import React from 'react';
import { NextPageContext } from 'next';
import nextCookie from 'next-cookies';
import Router from 'next/router';

import AuthService from '../../services/auth.service';

const redirect = (ctx: NextPageContext, url: string): void => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: url });
    ctx.res.end();
  } else {
    Router.push(url);
  }
};

interface WithAuthOptions {
  redirectOnAuthSuccess?: string;
  redirectOnAuthFailure?: string;
}

const withAuth = (options: WithAuthOptions) => (Component: any) => {
  // eslint-disable-next-line react/prefer-stateless-function
  return class extends React.Component {
    static async getInitialProps(ctx: NextPageContext): Promise<object> {
      const { token } = nextCookie(ctx);

      let user;
      try {
        user = new AuthService().decodeJWT(token);
        if (options.redirectOnAuthSuccess) {
          redirect(ctx, options.redirectOnAuthSuccess);
        }
      } catch (error) {
        if (options.redirectOnAuthFailure) {
          redirect(ctx, options.redirectOnAuthFailure);
        }
      }

      const componentProps = Component.getInitialProps && (await Component.getInitialProps(ctx));
      return { ...componentProps, user };
    }

    render(): JSX.Element {
      return <Component {...this.props} />;
    }
  };
};

export default withAuth;
