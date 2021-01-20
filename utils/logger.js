const winston = require('winston');

let level = process.env.LOG_LEVEL || 'warn';
if (process.env.NODE_ENV == 'development') {
    level = 'debug';
}

const logger = new winston.createLogger({
    transports: [
        new winston.transports.Console({
            // formatter: log => `${log.level}: ${new Date()} - worker ${worker} - ${log.message}`
            timestamp: true,
            // level: 'info',
            level,
            handleExceptions: true,
            json: false,
            colorize: true,
        }),
    ],
    exitOnError: false,
});


logger.stream = {
    write: (message, encoding) => {
        logger.info(message);
    },
};

module.exports = logger;
