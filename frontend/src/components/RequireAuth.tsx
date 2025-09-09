import type { PropsWithChildren } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getToken } from '../api/auth';

export default function RequireAuth({ children }: PropsWithChildren) {
  const token = getToken();
  const loc = useLocation();
  if (!token) return <Navigate to='/login' state={{ from: loc }} replace />;
  return <>{children}</>;
}
