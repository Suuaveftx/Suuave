'use client';

import FashionDesignerHeader from '../../fashion-designers/_components/studio-page-components/FashionDesignerHeader';
import SectionMain from '../../../components/layout/SectionMain';
import { SECTION_SHELL_CLASS } from '../../../components/layout/layoutConstants';

export default function Layout({ children }) {
  return (
    <div className={SECTION_SHELL_CLASS}>
      <FashionDesignerHeader />
      <SectionMain fontClass='font-satoshi'>{children}</SectionMain>
    </div>
  );
}
