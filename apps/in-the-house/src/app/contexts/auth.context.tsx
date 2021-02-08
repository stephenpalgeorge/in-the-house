import * as React from 'react';

export const AuthContext = React.createContext(null);

export interface AuthProviderProps {
  children: React.ReactNode|React.ReactNode[],
}
export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = React.useState<string>('');
  const [userId, setUserId] = React.useState<string>('');

  return (
    <AuthContext.Provider value={{
      accessToken,
      userId,
      setAccessToken,
      setUserId
    }}>
      { children }
    </AuthContext.Provider>
  )
}
