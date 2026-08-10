import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://ais-pre-f6a5z7kzz52uck3kdkfqm4-355211944850.asia-southeast1.run.app/sitemap.xml',
  };
}
