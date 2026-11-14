import { SitePage, getPageMetadata } from '@/components/site-page';

export function generateMetadata() {
  return getPageMetadata('index');
}

export default function HomePage() {
  return <SitePage slug="index" />;
}
