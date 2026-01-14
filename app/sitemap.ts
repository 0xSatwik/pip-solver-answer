import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/api';
import { getLast100Days, formatDateToSlug } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
    const staticRoutes = [
        '',
        '/about',
        '/archive',
        '/contact',
        '/privacy',
        '/solver',
        '/today',
        '/yesterday',
    ].map((route) => ({
        url: `${SITE_URL}${route}`,
        lastModified: new Date(),
        changeFrequency: 'daily' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    const last100Days = getLast100Days().map((date) => ({
        url: `${SITE_URL}/nyt-pips-answer-for-${formatDateToSlug(date)}`,
        lastModified: new Date(date),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...staticRoutes, ...last100Days];
}
