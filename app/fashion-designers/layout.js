import { redirect } from 'next/navigation';
import Footer from '../../components/landing-page-components/Footer';
import { getServerSession } from '../../lib/get-session';
import { requireAuth } from '../../lib/protected-routes';
import { Roles } from '../../utils/enum';
import FashionDesignerHeader from './_components/studio-page-components/FashionDesignerHeader';

export default async function Layout({ children }) {
  const session = await getServerSession();
  const user = session?.user;

  if (!user) {
    redirect('/auth/login');
  }
  await requireAuth(Roles.brand);

  return (
    <>
      <FashionDesignerHeader />
      <main className='font-satoshi pt-20  h-full'>{children}</main>
      <Footer />
    </>
  );
}
