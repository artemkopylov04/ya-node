
const https = require('https');
const axios = require('axios');

const instance = axios.create({
    httpsAgent: new https.Agent({  
        rejectUnauthorized: false,
    })
});

const databaseRequest = (req, res, next, options) => {
    return instance({
        method: options.method,
        url: options.url,
        data: options.data,
        headers: { 
            Authorization: `Bearer ${process.env.TOKEN}` ,
        },
    })
        .then((r) => {
            if (options.return) {
                return r
            } else {
                res.json({
                    status: r.status,
                    data: r.data,
                });
            }
        })
        .catch(e => {
            next(e);
        });
}

module.exports = { databaseRequest, instance };