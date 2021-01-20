const logger = require('./../utils/logger');
const sharp = require('./../utils/sharp');
const db = require('./../utils/db/db');
const fs = require('fs');
const path = require("path");
const outputWidths = [800, 1024];

exports.getTaskId = async (req, res) => {
    try {
        res.status(200).json(accounts);
    } catch (err) {
        logger.error(err);
        res.status(500).json(err);
    }
};

exports.saveTask = async (req, res) => {;
    try {
        req.body.file;

        const start_ts = Math.floor(Date.now() / 1000);
        if (req.body.all == true) {
            // all files of source

        } else if (req.body.file) {
            const filePath = path.resolve(__dirname, `../resources/images/source/${req.body.file}`);
            const extension = path.extname(filePath);
            const fileName = path.basename(filePath,extension);
            const output = path.resolve(__dirname, `../resources/images/output/${fileName}`);
            const file = fs.readFileSync(path.resolve(__dirname, filePath));

            let log = []
            if (file) {
                for (let index = 0; index < outputWidths.length; index++) {
                    const width = outputWidths[index];

                    let resizeResult = await sharp.resize(filePath, width, output, extension);
                    logger.info(resizeResult);
                    resizeResult["start_ts"] = start_ts;
                    log.push(resizeResult)
                    // db.saveTask(resizeResult)
                }

            }
            for (let index = 0; index < log.length; index++) {
                const element = log[index];
                db.saveTask(element)
            }
        }
        res.status(200).json('done');
    } catch (err) {
        logger.error(err.message);
        res.status(500).json(err.message);
    }
};