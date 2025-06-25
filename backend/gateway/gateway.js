const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const app = express();
app.use(cors());
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/db_auctions')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

port = 3001

// Proxy each service
app.use('/api/auth', createProxyMiddleware({ target: 'http://localhost:4000', changeOrigin: true, pathRewrite: {'^/api/auth': '',} }));
app.use('/api/users', createProxyMiddleware({ target: 'http://localhost:4001', changeOrigin: true, pathRewrite: {'^/api/users': '',} }));
app.use('/api/bids', createProxyMiddleware({ target: 'http://localhost:4002', changeOrigin: true, pathRewrite: {'^/api/bids': '',} }));
app.use('/api/auctions', createProxyMiddleware({ target: 'http://localhost:4003', changeOrigin: true, pathRewrite: {'^/api/auctions': '',} }));

app.listen(port, () => {
    console.log(`Gateway listening on http://localhost:${port}`);
});