const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Welcome to the Docker Basics Express App!');
});

router.get('/about', (req, res) => {
    res.send('This app demonstrates basic Docker concepts.');
});

router.get('/usage', (req, res) => {
    res.send('To use Docker, you need to install it and run commands in your terminal.');
});

module.exports = (app) => {
    app.use('/', router);
};