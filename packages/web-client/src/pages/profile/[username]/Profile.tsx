import React from 'react';
import { User } from '@skillfuze/types';
import { Avatar, Button } from '@skillfuze/ui-components';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Layout from '../../../components/Layout';
import { UsersService } from '../../../services/users.service';
import More from '../../../../assets/icons/More.svg';

interface Props {
  user: User;
}
const ProfilePage: NextPage<Props> = ({ user }: Props) => {
  const router = useRouter();

  const handleLiveClick = (): void => {
    router.push(`/livestreams/${user.livestreams[0].id}`);
  };

  const onClickMore = (): void => {
    console.log('More');
  };

  return (
    <Layout title="Profile">
      <div className="container flex flex-grow p-4 max-w-screen-xl mx-auto">
        <div className="flex lg:flex-no-wrap flex-wrap w-full lg:justify-between content-start">
          <div className="flex flex-col space-y-4 w-full lg:w-auto items-center mb-4">
            <Avatar className="w-32 h-32" URL={user.avatarURL} alt="userAvatar" />
            {user.livestreams && (
              <Button onClick={handleLiveClick} color="warning">
                Live
              </Button>
            )}
          </div>
          <div className="flex flex-1 flex-col space-y-8 max-w-screen-lg">
            <div className="flex flex-wrap">
              <div>
                <h1 className="font-bold">{`${user.firstName} ${user.lastName}`}</h1>
                <h5 className="text-grey-dark">{user.email}</h5>
              </div>
              <div className="mt-1 flex-grow md:ml-12">
                <Button className="w-48" variant="outlined">
                  Follow
                </Button>
              </div>
              <More className="mt-1 cursor-pointer" onClick={onClickMore} />
            </div>
            <h5 className="font-bold text-black-light">{`${0} followers  ${0} following`}</h5>
            <p className="text-xl text-black-light">{user.bio}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

ProfilePage.getInitialProps = async (ctx) => {
  const user = await UsersService.getProfileInfo(ctx.query.username.toString());
  return { user };
};

export default ProfilePage;
