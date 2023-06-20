import Parser from 'rss-parser';

function parseItems(feedName, items) {
    switch (feedName) {
        case 'hn':
        case 'tc': {
            return items.map(i => {
                    return {
                        title: i.title,
                        creator: i.creator,
                        link: i.link,
                        date: new Date(i.isoDate),
                        timestamp: new Date(i.isoDate).getTime(),
                        guid: i.guid,
                        snippet: feedName !== 'hn' ? i.contentSnippet.split('[...]')[0] : '',
                        content: i['content:encoded'] ?? '',
                        feed: feedName
                    }
                }
            );
        }
        default: {
            throw new Error('Unknown feed');
        }
    }
}

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const items = [];

    const parser = new Parser();

    const hnFeed = await parser.parseURL('https://news.ycombinator.com/rss');
    items.push(...parseItems('hn', hnFeed.items));

    const tcFeed = await parser.parseURL('https://techcrunch.com/feed');
    items.push(...parseItems('tc', tcFeed.items));

    items.sort((a, b) => b.timestamp - a.timestamp);

    return {
        news: items
    };
}
