/* eslint-disable react/button-has-type */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Input } from '@skillfuze/ui-components';
import LoginSVG from '../../assets/icons/login.svg';
import { Header } from '../../components/header';
import { Footer } from '../../components/footer';
import AuthService from '../../services/auth.service';

interface Props {
  name: string;
}

const LoginPage: React.FC<Props> = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
    }
  }, []);
  const handleSubmit = async event => {
    event.preventDefault();
    const { token } = await AuthService.login({ email, password });
    if (token) {
      router.push('/');
      localStorage.setItem('token', token);
      const decodedUser = AuthService.decodeJWT(token);
      AuthService.user = decodedUser;
    }
  };
  return (
    <div className="flex flex-col w-full h-screen">
      <div className="flex w-full h-16">
        <Header />
      </div>
      <div className="flex flex-row h-screen">
        <div className="flex w-3/5">
          <LoginSVG />
        </div>
        <div className="flex flex-col">
          <div className="mt-16">
            <p className="font-sans text-2xl font-bold text-left">Hello,</p>
            <p className="font-sans text-2xl font-bold text-left">Welcome back</p>
          </div>
          <div className="mt-8">
            <Input className="w-64" type="email" placeholder="Email" onChange={setEmail} />
          </div>
          <div className="mt-2">
            <Input className="w-64" type="password" placeholder="Password" onChange={setPassword} />
            <p className="font-sans text-xs text-primary text-right mt-4">Forgot password?</p>
          </div>
          <div className="mt-6">
            <Button className="w-full" onClick={handleSubmit}>
              login
            </Button>
          </div>
        </div>
      </div>
      <div className="flex flex-row w-full h-12 bg-primary items-center ">
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;
