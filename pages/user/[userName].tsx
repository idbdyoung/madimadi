import { GetServerSideProps, NextPage } from 'next';

import UserDetail from '../../components/UserDetail';

const userPage: NextPage = () => {
  return (
    <UserDetail />
  );
};

export const getServerSideProps: GetServerSideProps = async (props) => {
  return { props: {} };
};

export default userPage;
