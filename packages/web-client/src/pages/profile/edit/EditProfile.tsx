import React, { useState, useEffect } from 'react';
import { AttachmentType, UserTokenPayload } from '@skillfuze/types';
import { Input, Avatar, Button } from '@skillfuze/ui-components';
import { useAlert } from 'react-alert';
import { UsersService } from '../../../services/users.service';
import Layout from '../../../components/Layout';
import withAuth from '../../../utils/withAuth';
import { AttachmentsService } from '../../../services/attachments.service';

interface Props {
  user: UserTokenPayload;
}

const EditProfile = ({ user }: Props) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [bio, setBio] = useState(user.bio);
  const [avatarURL, setAvatarURL] = useState(user.avatarURL);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<any>({});
  const alert = useAlert();

  useEffect(() => {
    const getProfile = async () => {
      const profile = await UsersService.getProfileInfo(user.username);
      setFirstName(profile.firstName);
      setLastName(profile.lastName);
      setBio(profile.bio);
      setEmail(profile.email);
      setUsername(profile.username);
      setAvatarURL(profile.avatarURL);
    };
    getProfile();
  }, []);

  const handleOnClick = async () => {
    try {
      await UsersService.update({
        firstName,
        lastName,
        email,
        username,
        bio,
        password: password === '' ? undefined : password,
        confirmPassword: password === '' ? undefined : confirmPassword,
        avatarURL,
      });
      alert.show('Your profile has updated');
    } catch (err) {
      setError(err);
    }
  };

  const handleUploadAvatar = async () => {
    const inputEl = document.createElement('input');
    inputEl.type = 'file';
    inputEl.accept = 'image/*';
    inputEl.addEventListener('change', async (event: any) => {
      const file = event.target.files[0];
      const { url } = await AttachmentsService.upload(file, AttachmentType.PROFILE_PICTURE);
      setAvatarURL(url);
    });
    inputEl.click();
  };
  return (
    <Layout user={user} title="Edit Profile">
      <div className="container flex flex-grow mx-auto items-center flex-wrap-reverse max-w-screen-sm">
        <div className="flex sub-container flex-col p-6 justify-center space-y-6">
          <div className="flex items-center flex-grow">
            <Avatar URL={avatarURL} alt="Profile Picture" />
            <div className="flex-col flex-auto">
              <p className="ml-2 font-bold text-xl">{`${firstName} ${lastName}`}</p>
              <Button
                onClick={handleUploadAvatar}
                variant="link"
                className="ml-2 mt-2 leading-tight text-primary text-xs"
              >
                Change Profile Picture
              </Button>
            </div>
          </div>
          <div className="flex space-x-6">
            <Input
              containerClassName="flex-grow"
              label="First Name"
              error={error.firstName}
              onChange={setFirstName}
              value={firstName}
            />
            <Input
              containerClassName="flex-grow"
              label="Last Name"
              error={error.lastName}
              onChange={setLastName}
              value={lastName}
            />
          </div>
          <div className="flex space-x-6">
            <Input
              containerClassName="flex-grow"
              label="Username"
              error={error.username}
              onChange={setUsername}
              value={username}
            />
            <Input containerClassName="flex-grow" label="Email" error={error.email} onChange={setEmail} value={email} />
          </div>
          <Input label="Bio" error={error.bio} onChange={setBio} value={bio} multiline rows={6} />
          <div className="flex space-x-6">
            <Input
              containerClassName="flex-grow"
              label="New Password"
              error={error.password}
              onChange={setPassword}
              value={password}
            />
            <Input
              containerClassName="flex-grow"
              label="Confirm New Password"
              error={error.confirmPassword}
              onChange={setConfirmPassword}
              value={confirmPassword}
            />
          </div>
          <Button onClick={handleOnClick}>Save</Button>
        </div>
      </div>
      <style jsx global>
        {`
          .sub-container {
            flex: 1 0 50%;
          }
        `}
      </style>
    </Layout>
  );
};

export default withAuth({ redirectOnAuthFailure: '/login' })(EditProfile);
