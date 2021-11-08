import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT || 8080,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || 'faceId',
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || 'faceSecret',
    GMAIL_EMAIL : process.env.GMAIL_EMAIL || 'gmail',
    GMAIL_PASSWORD : process.env.GMAIL_PASSWORD || 'gmailPassword',
    GMAIL_NAME : process.env.GMAIL_NAME || 'gmailName'
};