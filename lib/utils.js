import axios from 'axios';

// Bitly API integration
const BITLY_API_URL = 'https://api-ssl.bitly.com/v4';
const BITLY_ACCESS_TOKEN = process.env.BITLY_ACCESS_TOKEN;

export async function createShortLink(longUrl) {
  try {
    const response = await axios.post(`${BITLY_API_URL}/shorten`, 
      { long_url: longUrl },
      { headers: { 'Authorization': `Bearer ${BITLY_ACCESS_TOKEN}` } }
    );
    return response.data.link;
  } catch (error) {
    console.error('Error creating short link:', error);
    throw new Error('Failed to create short link');
  }
}

// Validate Temu referral link
export function isValidTemuReferralLink(link) {
  const temuRegex = /^https:\/\/www\.temu\.com\/.*_act_code=.*/;
  return temuRegex.test(link);
}

// Generate expiration date
export function generateExpirationDate(minutes) {
  return new Date(Date.now() + minutes * 60000);
}

// Format date for display
export function formatDate(date) {
  return new Date(date).toLocaleString();
}