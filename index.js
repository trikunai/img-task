const express = require('express');
const bodyParser = require('body-parser')

const logger = require('./utils/logger');

const app = express()
const port = process.env.API_PORT || 3000;



const router = express.Router();

// create application/json parser
var jsonParser = bodyParser.json()
app.use(jsonParser)
require('./routes/task')(router, logger);
app.use('/api/', router);


app.listen(port, () => {
    logger.info(`Service running on port ${port}!`);
});