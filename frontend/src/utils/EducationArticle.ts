import Parser from 'rss-parser';

const fetchEducationArticles = async () => {
  const parser = new Parser();
  const allArticles = [];
  
  const feeds = [
    'https://www.edweek.org/feed',
    'https://www.edutopia.org/rss.xml',
    'https://hechingerreport.org/feed/',
  ];
  
  for (const feedUrl of feeds) {
    try {
      const feed = await parser.parseURL(feedUrl);
      const articles = feed.items.slice(0, 3).map(item => ({
        title: item.title,
        summary: item.contentSnippet || item.content,
        url: item.link,
        source: feed.title,
        publishedAt: item.pubDate
      }));
      allArticles.push(...articles);
      console.log(feed)
    } catch (error) {
      console.error(`Error fetching ${feedUrl}:`, error);
    }
  }
  
  return allArticles;
};


export {fetchEducationArticles};