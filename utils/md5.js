const md5File = require('md5-file')
const logger = require('./logger');

exports.getFileMD5 = async (path) => {
    try {
        const hash = md5File.sync(path);
        return hash;
    } catch (error) {
        logger.error(error)
        throw error;
    }
}