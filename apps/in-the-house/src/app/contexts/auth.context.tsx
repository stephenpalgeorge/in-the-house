import * as React from 'react';
import { IUserProfile } from '@in-the-house/api-interfaces';

export const AuthContext = React.createContext(null);

export interface AuthProviderProps {
  children: React.ReactNode|React.ReactNode[],
}
export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = React.useState<string>('');
  const [user, setUser] = React.useState<IUserProfile>({});
  const [userId, setUserId] = React.useState<string>('');

  return (
    <AuthContext.Provider value={{
      accessToken,
      user,
      userId,
      setAccessToken,
      setUser,
      setUserId,
    }}>
      { children }
    </AuthContext.Provider>
  )
}
