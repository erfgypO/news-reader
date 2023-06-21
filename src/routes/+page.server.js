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
        case 'engadget': {
            return items.map(i => {
                return {
                    title: i.title,
                    creator: i.creator,
                    link: i.link,
                    date: new Date(i.isoDate),
                    timestamp: new Date(i.isoDate).getTime(),
                    guid: i.guid,
                    feed: feedName,
                    media: i.media.$
                }
            });
        }
        default: {
            throw new Error('Unknown feed');
        }
    }
}

/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const parser = new Parser();

    const loadHnFeed = parser.parseURL('https://news.ycombinator.com/rss').then(feed => parseItems('hn', feed.items));
    const loadTcFeed = parser.parseURL('https://techcrunch.com/feed').then(feed => parseItems('tc', feed.items));

    const engadgetParser = new Parser({
        customFields: {
            item: [
                ['media:content','media', {keepArray: false}],
            ]
        }
    });
    const loadEngadgetFeed = engadgetParser.parseURL('https://www.engadget.com/rss.xml').then(feed => parseItems('engadget', feed.items));

    const items = (await Promise.all([loadHnFeed, loadTcFeed, loadEngadgetFeed])).flat();

    items.sort((a, b) => b.timestamp - a.timestamp);

    return {
        news: items,
    };
}
