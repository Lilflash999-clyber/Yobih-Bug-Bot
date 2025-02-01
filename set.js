


const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNEllTDVrSE5vY1pqQlVoVGF6TXc1eEtqdEJzUitIVFFxZVdDVVV1blUzZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUFIMHYzekgxRkF4WjhkRTkwOGE5UHd1eGxGN2FPQkdzUnhvY2cxNjhYOD0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjTWtaSGV6TnVNeThqQkhyQUR0Nm9aQVRPOUJqT1VteVFJVGpXUGVEdlVBPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzQ3lFNTczd1V2YnJqa29aSWNJTWdEZjZCVzQ1T1RWa2g0Y2Q2RGpKd0M4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJBSWZUN3pudGZOQzRLYWI4eHJnY3crVDZySG5OS3lzYkdLRWdrbHJEM2c9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InphT0piT3RxUzZNeW95VytIS0dTSVArcW92K0F4VFA5dXlBMjFQTHhIVWs9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkdOelNRK2tuWjRvWWpQTUJRU0pIbE02bVEwZ1lJZFBLSGR6WlVaenRtST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiK2JaazBKaithNElCZGVvb3Y2UlRKWUNvSEVacmIxZUN2RStTVTBUK214UT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImsxM044a09zanB3bm9vR1g1Y3pkNDlOZjZiWUpCaWFCVTVMelA4T3JadnlsM1gyazZhdUlTT0VVTHBWRGp1RE5UelNIcmlvWEY2VFJHU3VKeE1aOWlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NTMsImFkdlNlY3JldEtleSI6IktRL1FxZlozYm9tRElCSDNIRXkwQkpiTSt5dEoydXBrZUh2bmg1WVpyaGM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InRkX2ZTdVBMU0dTeTVXSWVlSTZaVkEiLCJwaG9uZUlkIjoiODBiNjAwZDMtZmQzZS00Zjg5LTk5MzUtMGZmMjRmYTNhZjliIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZVSGNOMXNlbUJRemdzZlQ0di9lVU10YkRnOD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsSWhCZVJxejZxME5SaE0vTUs5V3FiMU5sM1E9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQlNKSEI3WDQiLCJtZSI6eyJpZCI6IjIzNDcwNDAwODkxMjM6MzRAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0xIZCsrME5FTnp2K2J3R0dBOGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IksyZnA5RUVsZUN1eWdmNmY0cEZ0MXdhUFhkNy9kSUtTQmZWdC92U3JSMGM9IiwiYWNjb3VudFNpZ25hdHVyZSI6IjhaVEE2ZzcvVkVCUWVIeFB6cVNiZFRWVHYycDk3SS9DZ0JZdDIxY0xZK05PY2xRTENKazNxTyt4QUc4UEY1WUMzVFR4Z0ZtQkNTMGl5bmw2a0R6VGhRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJzK1BOOGd6SWllZkNMYnpVQis4d21wb2VydDg0ZC91OGE1OTVBZ1ZtS2FCc3BtMzJPTkR6RC9QaFlic1JMSGRuQnNuRmR3c3FTaGZyOWVJVWVJZUdqdz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzNDcwNDAwODkxMjM6MzRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCU3RuNmZSQkpYZ3Jzb0grbitLUmJkY0dqMTNlLzNTQ2tnWDFiZjcwcTBkSCJ9fV0sInBsYXRmb3JtIjoiaXBob25lIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM4NDM4NjMzLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUMrVSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Yobih md",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Yobih-MD",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Yobih md bug Bot',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/d0cd3c82fbbc120f38ac4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

