const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const app = express();
app.use(cors());
const {verifyToken} = require('../auth/auth');

port = 3001

// Proxy each service
app.use('/api/auth', createProxyMiddleware({ target: 'http://localhost:4000', changeOrigin: true, pathRewrite: {'^/api/auth': '',} }));
app.use('/api/bids', verifyToken, createProxyMiddleware({ target: 'http://localhost:4001', changeOrigin: true, pathRewrite: {'^/api/bids': '',} }));
app.use('/api/auctions', verifyToken, createProxyMiddleware({ target: 'http://localhost:4002', changeOrigin: true, pathRewrite: {'^/api/auctions': '',} }));

app.listen(port, () => {
    console.log(`Gateway listening on http://localhost:${port}`);
});