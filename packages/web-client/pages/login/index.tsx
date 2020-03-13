import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Input } from '@skillfuze/ui-components';
import LoginSVG from '../../assets/icons/login.svg';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';
import AuthService from '../../services/auth.service';

const LoginPage = () => {
  const authService = AuthService.getInstance();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = authService.getItem('token');
    if (token) {
      router.push('/');
    }
  }, []);
  const handleSubmit = async event => {
    event.preventDefault();
    const { token } = await authService.login({ email, password });
    if (token) {
      router.push('/');
      authService.setItem(token);
      const decodedUser = authService.decodeJWT(token);
      authService.user = decodedUser;
    }
  };
  return (
    <div className="flex flex-col w-full h-screen">
      <Header />
      <div className="flex flex-row h-screen">
        <div className="flex w-3/5">
          <LoginSVG />
        </div>
        <div className="flex flex-col w-1/4">
          <div className="mt-16">
            <p className="text-2xl font-bold text-left">
              <strong>Hello,</strong>
              <br />
              <strong>Welcome back</strong>
            </p>
          </div>
          <Input className="mt-8 w-full" type="email" placeholder="Email" onChange={setEmail} />
          <Input className="mt-2 w-full" type="password" placeholder="Password" onChange={setPassword} />
          <p className="text-xs text-primary text-right mt-4">Forgot password?</p>
          <Button className="mt-6 w-full" onClick={handleSubmit}>
            login
          </Button>
        </div>
      </div>
      <div className="flex flex-row w-full h-12 bg-primary items-center ">
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;
