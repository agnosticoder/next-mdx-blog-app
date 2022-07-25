import httpProxy from 'http-proxy'
import { NextApiRequest, NextApiResponse } from 'next'
const API_URL = process.env.API_URL ?? '' // The actual URL of your API
const proxy = httpProxy.createProxyServer()
// Make sure that we don't parse JSON bodies on this route:
export const config = {
    api: {
        bodyParser: false
    }
}
const handler = (req:NextApiRequest, res:NextApiResponse) => {
    console.log('poxy working');
    proxy.web(req, res, { target: API_URL, changeOrigin: true })
}

export default handler;