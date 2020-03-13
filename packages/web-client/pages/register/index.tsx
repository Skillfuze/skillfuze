import React, { useState } from 'react';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div style={{ display: 'flex', padding: '2rem 8rem' }}>
      <div style={{ flexGrow: 3 }}>
        <h1>Picture</h1>
      </div>

      <div style={{ flexGrow: 1 }}>
        <h1>
          Join Skillfuze
          <br />
          Now!
        </h1>

        <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmit}>
          <input name="firstName" value={firstName} placeholder="First Name" type="text" style={{ marginTop: '1rem' }} />
          <input name="lastName" value={lastName} placeholder="Last Name" type="text" style={{ marginTop: '1rem' }} />
          <input name="email" value={email} placeholder="Email" type="email" style={{ marginTop: '1rem' }} />
          <input name="password" value={password} placeholder="Password" type="password" style={{ marginTop: '1rem' }} />
          <input name="confirmPassword" value={confirmPassword} placeholder="Confirm Password" type="password" style={{ marginTop: '1rem' }} />
          <button type="submit" style={{ marginTop: '1rem' }}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
