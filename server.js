
const express = require('express');
const app = express();
const port = process.env.PORT || 4205;
const router = express.Router();
const bot = require('./chatbot.js')
// start server
app.listen(port, function (req, res) {
    bot()
    console.info(`Started Express server on port ${port}`)
});
