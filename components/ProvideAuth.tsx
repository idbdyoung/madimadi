import { createContext, ReactNode, useState } from 'react';

interface userType {
  isLoggedIn: boolean;
  userName: string;
}
interface authType {
  user: userType;
  signIn: (...any: any) => any;
  signOut: (...any: any) => any;
}
interface IProps {
  user: userType,
  children: ReactNode;
}

const initialContext: authType = {
  user: {
    isLoggedIn: false,
    userName: '',
  },
  signIn: () => {},
  signOut: () => {},
};

export const authContext = createContext(initialContext);

const useProvideAuth = (userAuth: userType): authType => {
  const [user, setUser] = useState<any>(userAuth);
  const signIn = (userObj: userType) => (setUser(userObj));
  const signOut = () => (setUser(initialContext.user));

  return {
    user,
    signIn,
    signOut,
  };
};

const ProvideAuth: React.FC<IProps> = ({ user, children }) => {
  const auth = useProvideAuth(user);

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};

export default ProvideAuth;
