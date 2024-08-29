import axios from 'axios';

const BITLY_API_URL = 'https://api-ssl.bitly.com/v4/shorten';

export const createShortLink = async (longUrl) => {
  try {
    const response = await axios.post(BITLY_API_URL, {
      long_url: longUrl,
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.BITLY_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.link;
  } catch (error) {
    console.error('Error creating short link:', error);
    throw new Error('Failed to create short link');
  }
};