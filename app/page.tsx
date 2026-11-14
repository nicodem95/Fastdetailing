import { SitePage, getPageMetadata } from '@/components/site-page';

export const metadata = getPageMetadata('index');

export default function HomePage() {
  return <SitePage slug="index" />;
}
