export interface RssFeed {
    title: string;
    description: string;
    link: string;
    pubDate: string;
    imageUrl?: string;
    location?: string;
    workType?: string;
    guid?: string;
}

function extractImageUrlFromItem(item: Element): string | undefined {
    // Namespace-aware MRSS (preferred)
    try {
        const MRSS_NS = 'http://search.yahoo.com/mrss/';
        const contentNS = (item as any).getElementsByTagNameNS?.(MRSS_NS, 'content');
        if (contentNS && contentNS[0] && contentNS[0].getAttribute('url')) {
            return contentNS[0].getAttribute('url') || undefined;
        }
        const thumbNS = (item as any).getElementsByTagNameNS?.(MRSS_NS, 'thumbnail');
        if (thumbNS && thumbNS[0] && thumbNS[0].getAttribute('url')) {
            return thumbNS[0].getAttribute('url') || undefined;
        }
    } catch {}

    // Fallbacks using CSS selectors
    const mediaContent = item.querySelector('media\\:content');
    if (mediaContent?.getAttribute('url')) {
        return mediaContent.getAttribute('url') || undefined;
    }

    const mediaContentInGroup = item.querySelector('media\\:group media\\:content');
    if (mediaContentInGroup?.getAttribute('url')) {
        return mediaContentInGroup.getAttribute('url') || undefined;
    }

    const mediaThumb = item.querySelector('media\\:thumbnail');
    if (mediaThumb?.getAttribute('url')) {
        return mediaThumb.getAttribute('url') || undefined;
    }

    const enclosures = Array.from(item.getElementsByTagName('enclosure'));
    const imageEnclosure = enclosures.find((e) => {
        const type = e.getAttribute('type') || '';
        return type.startsWith('image/');
    });
    if (imageEnclosure?.getAttribute('url')) {
        return imageEnclosure.getAttribute('url') || undefined;
    }

    // Inline image inside content:encoded
    let contentEncoded = '';
    try {
        const CONTENT_NS = 'http://purl.org/rss/1.0/modules/content/';
        const encNS = (item as any).getElementsByTagNameNS?.(CONTENT_NS, 'encoded');
        contentEncoded = encNS && encNS[0] ? encNS[0].textContent || '' : '';
    } catch {}
    if (!contentEncoded) {
        contentEncoded = item.querySelector('content\\:encoded')?.textContent || '';
    }
    if (contentEncoded) {
        const match = contentEncoded.match(/<img[^>]+src=["']([^"']+)["']/i);
        if (match?.[1]) return match[1];
    }

    return undefined;
}

export async function fetchRssFeed(url: string): Promise<RssFeed[]> {
    const response = await fetch(url);
    const xml = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'application/xml');
    const items = doc.querySelectorAll('item');
    return Array.from(items).map((item) => ({
        title: item.querySelector('title')?.textContent || '',
        description: item.querySelector('description')?.textContent || '',
        link: item.querySelector('link')?.textContent || '',
        pubDate: item.querySelector('pubDate')?.textContent || '',
        imageUrl: extractImageUrlFromItem(item),
        location: item.querySelector('location')?.textContent || undefined,
        workType: item.querySelector('work_type')?.textContent || undefined,
        guid: item.querySelector('guid')?.textContent || undefined
    }));
}
