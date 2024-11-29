import { FC, PropsWithChildren, useState } from 'react';
import { AuthContext } from './AuthContex';

export const AuthProvider: FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const isAuthenticated = auth.token !== undefined;
    return isAuthenticated;
  });
  const [userName, setUserName] = useState(() => {
    const auth = JSON.parse(localStorage.getItem('auth') || '{}');
    const userName = auth.userName || '';
    return userName;
  });

  const setAuth = ({ isAuthenticated, name }: { isAuthenticated: boolean; name: string }) => {
    setIsAuthenticated(isAuthenticated);
    setUserName(name);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        userName,
        setAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

type Props = PropsWithChildren;
