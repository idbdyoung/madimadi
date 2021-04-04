import { createContext, ReactNode, useState } from 'react';

interface authType {
  user: any;
  signIn: (...any: any) => any;
  signOut: (...any: any) => any;
}
interface IProps {
  user: string | null;
  children: ReactNode;
}

const initialContext: authType = {
  user: null,
  signIn: () => {},
  signOut: () => {},
};

export const authContext = createContext(initialContext);

const useProvideAuth = (): authType => {
  const [user, setUser] = useState<any>(null);

  const signIn = (user: string) => (setUser(user));
  const signOut = () => (setUser(null));

  return {
    user,
    signIn,
    signOut,
  };
};

const ProvideAuth: React.FC<IProps> = ({ user, children }) => {
  const auth = useProvideAuth();
  if (user) auth.user = user;

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};

export default ProvideAuth;
