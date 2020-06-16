import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Input, Button } from '@skillfuze/ui-components';
import { useAlert } from 'react-alert';

import RegisterSVG from '../../../assets/illustrations/register.svg';
import Layout from '../../components/Layout';
import AuthService from '../../services/auth.service';

const RegisterPage = () => {
  const alert = useAlert();
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<any>({});

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();

    try {
      await new AuthService().register({
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });
      router.push('/login');
      alert.show('Welcome to Skillfuze');
    } catch (err) {
      setError(err);
      if (err.general) {
        setError(prev => ({ ...prev, email: err.general }));
      }
    }
  };

  const onLoginClick = (): void => {
    router.push('/login');
  };

  const navControls = (
    <Button className="w-48" variant="outlined" onClick={onLoginClick}>
      LOGIN
    </Button>
  );

  return (
    <Layout navControls={navControls} title="Register" showProfileControls={false}>
      <div className="flex flex-grow px-40 items-center">
        <div className="flex w-2/3">
          <RegisterSVG />
        </div>

        <div className="w-1/3">
          <h1 className="text-2xl font-bold">
            Join Skillfuze
            <br />
            Now!
          </h1>

          <form className="flex flex-col" onSubmit={onSubmit}>
            <Input
              error={error.firstName}
              value={firstName}
              onChange={setFirstName}
              placeholder="First Name"
              type="text"
              className="mt-4"
            />
            <Input
              error={error.lastName}
              value={lastName}
              onChange={setLastName}
              placeholder="Last Name"
              type="text"
              className="mt-4"
            />
            <Input
              error={error.email}
              value={email}
              onChange={setEmail}
              placeholder="Email"
              type="email"
              className="mt-4"
            />
            <Input
              error={error.password}
              value={password}
              onChange={setPassword}
              placeholder="Password"
              type="password"
              className="mt-4"
            />
            <Input
              error={error.confirmPassword}
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Confirm Password"
              type="password"
              className="mt-4"
            />
            <Button type="submit" className="mt-4">
              Register
            </Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default RegisterPage;
