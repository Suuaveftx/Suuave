'use client';

import { usePathname } from 'next/navigation';
import Footer from '../../components/landing-page-components/Footer';
import ArtistNavbar from '../../components/ArtistNavbar';
import SectionMain from '../../components/layout/SectionMain';
import {
  ARTIST_ONBOARDING_ROUTES,
  ARTIST_SELF_LAYOUT_PREFIXES,
  SECTION_SHELL_CLASS,
} from '../../components/layout/layoutConstants';

export default function ArtistPageLayout({ children }) {
  const pathname = usePathname();
  const usesSelfLayout = ARTIST_SELF_LAYOUT_PREFIXES.some((route) =>
    pathname.startsWith(route)
  );
  const isOnboarding = ARTIST_ONBOARDING_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  if (usesSelfLayout) {
    return children;
  }

  return (
    <div className={SECTION_SHELL_CLASS}>
      {/* Conditionally hide Navbar on mobile for specific routes */}
      <div className={pathname.includes('-contract-information') ? "hidden lg:block" : ""}>
        {!isOnboarding && <ArtistNavbar />}
      </div>
      <SectionMain
        withNavbarOffset={!isOnboarding}
        fontClass='font-proximanova'
      >
        {children}
      </SectionMain>
      {!isOnboarding && <Footer />}
    </div>
  );
}
