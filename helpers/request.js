
const https = require('https');
const axios = require('axios');
require('dotenv').config();

const instance = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

const authHeader = {
  Authorization: `Bearer ${process.env.TOKEN}`,
};


module.exports = { instance, authHeader };
