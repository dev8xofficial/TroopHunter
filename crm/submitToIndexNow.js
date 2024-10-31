import axios from 'axios';
import xml2js from 'xml2js';

const extractUrlsFromSitemap = async (sitemapUrl) => {
  try {
    const { data } = await axios.get(sitemapUrl);
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(data);
    const urls = result.urlset.url.map((urlEntry) => urlEntry.loc[0]);

    return urls;
  } catch (error) {
    console.error('Error fetching or parsing sitemap:', error);
    return [];
  }
};

const submitUrlsToIndexNow = async (urls) => {
  try {
    await axios.post('https://api.indexnow.org/indexnow', {
      host: 'www.troophunter.com',
      key: '433007b64fc144ebab1d16b269c7664f',
      keyLocation: 'https://www.troophunter.com/433007b64fc144ebab1d16b269c7664f.txt',
      urlList: urls
    });
    console.log('Successfully submitted URLs to IndexNow');
  } catch (error) {
    console.error('Error submitting URLs:', error);
  }
};

const runAutomation = async () => {
  const urls = await extractUrlsFromSitemap('https://www.troophunter.com/sitemap.xml');

  await submitUrlsToIndexNow(urls);
};

runAutomation();
