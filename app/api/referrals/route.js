import { shortenLink } from '../../../lib/bitly';
import { limiter } from '../../../middleware';

export default async function handler(req, res) {
  await limiter(req, res);
  
  if (req.method === 'POST') {
    const { longUrl } = req.body;
    const accessToken = process.env.BITLY_ACCESS_TOKEN;

    try {
      const shortUrl = await shortenLink(longUrl, accessToken);
      res.status(200).json({ shortUrl });
    } catch (error) {
      res.status(500).json({ error: 'Failed to shorten link' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
