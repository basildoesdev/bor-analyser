// netlify/functions/fetchRugbyData.js
// const fetch = require('node-fetch'); // Make sure to install node-fetch
import fetch from 'node-fetch';
 // Make sure to install node-fetch
const corsProxy = 'https://corsproxy.io/?';
const targetUrl = 'https://classic-api.blackoutrugby.com/';

// API URL
const _devId = process.env.DEVID;
const _devKey = process.env.DEVKEY;

exports.handler = async (event, context) => {
    const { requestType, additionalParams } = JSON.parse(event.body);

    const timestamp = new Date().getTime();
    const API_URL = `${corsProxy}${targetUrl}?t=${timestamp}`;

    const mailParams = {
        d: _devId,
        dk: _devKey,
        r: requestType,
        m: globals._memberid,
        mk: globals._mainKey,
        json: 1,
        ...additionalParams,
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
            body: new URLSearchParams(mailParams),
        });

        const data = await response.json();

        if (data?.status?.trim() === 'Ok') {
            return {
                statusCode: 200,
                body: JSON.stringify(data),
            };
        } else {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid response' }),
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};
