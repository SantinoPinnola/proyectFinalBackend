import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT || 8080,
    FACEBOOK_APP_ID: process.env.FACEBOOK_APP_ID || 'faceId',
    FACEBOOK_APP_SECRET: process.env.FACEBOOK_APP_SECRET || 'faceSecret',
    GMAIL_EMAIL : process.env.GMAIL_EMAIL || 'gmail',
    GMAIL_PASSWORD : process.env.GMAIL_PASSWORD || 'gmailPassword',
    GMAIL_NAME : process.env.GMAIL_NAME || 'gmailName',
    ETHEREAL_EMAIL : process.env.ETHEREAL_EMAIL || 'etherealMail',
    ETHEREAL_PASSWORD : process.env.ETHEREAL_PASSWORD || 'etherealPassword',
    ETHEREAL_NAME : process.env.ETHEREAL_NAME || 'etherealName',
    TWILIO_CELLPHONE : process.env.TWILIO_CELLPHONE || 'twilioCellphone',
    TWILIO_TOKEN : process.env.TWILIO_TOKEN || 'twilioToken',
    TWILIO_ACCOUNT_ID : process.env.TWILIO_ACCOUNT_ID || 'twilioAccountID',
    TEST_PHONENUMBER : process.env.TEST_PHONENUMBER || 'testPhonenumber',
    TWILIO_WHATSAPP_NUMBER : process.env.TWILIO_WHATSAPP_NUMBER || 'twilioWspNumber',
<<<<<<< HEAD
    MONGO_LOCAL_DBNAME : process.env.MONGO_LOCAL_DBNAME || 'mongoDBLocalName',
    MONGO_ATLAS_USER: process.env.MONGO_ATLAS_USER || 'user',
    MONGO_ATLAS_PASSWORD: process.env.MONGO_ATLAS_PASSWORD || 'pasw',
    MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER || 'clusterUrl',
    MONGO_ATLAS_DBNAME: process.env.MONGO_ATLAS_DBNAME || 'dbName'
=======
    MONGO_LOCAL_DBNAME : process.env.MONGO_LOCAL_DBNAME || 'localDbName'
>>>>>>> 8a3f22bb9002e0910f2dc6b42d167d61daae6c9c
};