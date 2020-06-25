import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Input } from '@skillfuze/ui-components';
import { GoogleLogin, GoogleLoginResponseOffline } from 'react-google-login';
import Link from 'next/link';
import { useAlert } from 'react-alert';
import LoginSVG from '../../../assets/icons/login.svg';
import AuthService from '../../services/auth.service';
import withAuth from '../../utils/withAuth/withAuth';
import Layout from '../../components/Layout';
import config from '../../../config';

const LoginPage = () => {
  const authService = new AuthService();
  const router = useRouter();
  const alert = useAlert();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(undefined);

  const onTokenReceived = (token: string) => {
    if (token) {
      router.push('/');
      authService.setToken(token);
      alert.show('Welcome to Skillfuze');
    }
  };

  const handleSubmit = async (event): Promise<void> => {
    event.preventDefault();
    try {
      const { token } = await authService.login({ username: email, password });
      onTokenReceived(token);
    } catch (err) {
      setError('Invalid Email or Password');
    }
  };

  const onGoogleLogin = async (response: GoogleLoginResponseOffline): Promise<void> => {
    const { token } = await authService.googleLogin(response.code);
    onTokenReceived(token);
  };

  const onRegisterClick = (): void => {
    router.push('/register');
  };

  const navControls = (
    <Button className="w-48" variant="outlined" onClick={onRegisterClick}>
      REGISTER
    </Button>
  );

  return (
    <Layout navControls={navControls} title="Login" showProfileControls={false}>
      <div className="flex flex-grow px-40 items-center justify-center h-full">
        <div className="flex w-2/3">
          <LoginSVG />
        </div>

        <div className="w-1/3">
          <h1 className="text-2xl font-bold text-left">
            Hello,
            <br />
            Welcome back
          </h1>
          <Input className="mt-8 w-full" value={email} type="email" placeholder="Email" onChange={setEmail} />
          <Input
            className="mt-2 w-full"
            value={password}
            type="password"
            placeholder="Password"
            onChange={setPassword}
          />
          {error && <p className="text-xs text-warning text-right mt-1">{error}</p>}
          <div className="text-right mt-3">
            <Link href="/register">
              <Button className="text-xs" variant="link">
                Forgot password?
              </Button>
            </Link>
          </div>
          <Button className="mt-6 w-full" onClick={handleSubmit}>
            login
          </Button>
          <p className="w-full text-center border-b border-solid border-grey mt-6" style={{ lineHeight: '0.1em' }}>
            <span className="bg-white px-2 text-sm text-grey-dark">OR</span>
          </p>
          <GoogleLogin
            clientId={config.googleClientId}
            responseType="code"
            onSuccess={onGoogleLogin}
            buttonText="Login with Google"
            onFailure={undefined}
            scope="openid profile email"
            className="w-full mt-6 justify-center rounded"
          />
        </div>
      </div>
    </Layout>
  );
};

export default withAuth({
  redirectOnAuthSuccess: '/',
})(LoginPage);
