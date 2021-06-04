import { GetServerSideProps, NextPage } from 'next';

const ground: NextPage = () => {
  return (
    <div>ground</div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  try {

    return { props: {} };
  } catch (e) {
    console.log(e);

    return { props: {} };
  }
};

export default ground;
