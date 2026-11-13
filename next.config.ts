import type { NextConfig } from 'next';

const legacyPages = [
  'prestations',
  'avant-apres',
  'realisations',
  'pare-brise',
  'tarifs-lavage-auto',
  'administratif-assurance',
  'contact',
  'mentions-legales',
];

const nextConfig: NextConfig = {
  agentRules: false,
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/administratif.html', destination: '/administratif-assurance.html', permanent: true },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: legacyPages.map((slug) => ({
        source: `/${slug}.html`,
        destination: `/${slug}`,
      })),
    };
  },
};

export default nextConfig;