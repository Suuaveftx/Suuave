import { redirect } from 'next/navigation';
import { useAuth } from '../../hooks/use-Auth';

export default function AuthLayout({ children }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <div className='min-h-screen bg-white'>{children}</div>;
  }

  redirect('/artist-page');
}
