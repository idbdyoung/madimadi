import { createContext, useState } from 'react';

interface authType {
  user: any;
  signIn: (...any: any) => any;
  signOut: (...any: any) => any;
}

const initialContext: authType = {
  user: null,
  signIn: () => {},
  signOut: () => {},
};

export const authContext = createContext(initialContext);

const Auth = {
  isAuthenticated: false,
  signIn(cb: any) {
    Auth.isAuthenticated = true;
    setTimeout(cb, 100);
  },
  signOut(cb: any) {
    Auth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

const useProvideAuth = (): authType => {
  const [user, setUser] = useState<any>(null);

  const signIn = (cb: any) => {
    return Auth.signIn(() => {
      setUser('user');
      cb();
    });
  };
  const signOut = (cb: any) => {
    return Auth.signOut(() => {
      setUser('');
      cb();
    });
  };

  return {
    user,
    signIn,
    signOut,
  };
};

const ProvideAuth: React.FC = ({ children }) => {
  const auth = useProvideAuth();

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
};

export default ProvideAuth;
