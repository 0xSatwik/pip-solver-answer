import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/api';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/_next/static/images/'], // Optional: disallow static images if preferred, but usually keep it open
        },
        sitemap: `${SITE_URL}/sitemap.xml`,
    };
}
