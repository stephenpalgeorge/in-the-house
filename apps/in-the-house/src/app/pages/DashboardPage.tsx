import * as React from 'react';
import { useParams } from 'react-router-dom';

import { AuthContext } from '../contexts/auth.context';
import { fetchUser } from '../fetch';

interface DashboardParams {
  userId: string,
}

export function DashboardPage() {
  const params = useParams<DashboardParams>();
  const authContext = React.useContext(AuthContext);

  const authenticateUser = async (id: string, accessToken: string) => {
    if (id !== authContext.userId) return;
    const authResponse = await fetchUser(id, accessToken);
  }
  
  React.useEffect(() => {
    authenticateUser(params.userId, authContext.accessToken);
  }, [params.userId]);
  return (
    <h1>Dashboaord</h1>
  );
}
