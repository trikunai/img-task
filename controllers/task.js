const logger = require('./../utils/logger');
const sharp = require('./../utils/sharp');
const db = require('./../utils/db/db');
const fs = require('fs');
const path = require("path");
const outputWidths = [800, 1024];
const { nanoid } = require("nanoid")
const idlength = 6
exports.getTaskId = async (req, res) => {
    try {
        const task = await db.getByTaskId(req.params.taskId)

        if (task) {
            res.status(200).json(task);
        } else {
            res.status(204).send(`Task with taskId ${req.params.taskId} not found`);
        }
        res.status(200).json();
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
            let filePath;
            let extension;
            let output;
            let file;
            try {
                filePath = path.resolve(__dirname, `../resources/images/source/${req.body.file}`);
                extension = path.extname(filePath);
                fileName = path.basename(filePath,extension);
                output = path.resolve(__dirname, `../resources/images/output/${fileName}`);
                file = fs.readFileSync(path.resolve(__dirname, filePath));
            } catch (error) {
                throw new Error(`No such file "${req.body.file}" found in directory`)
            }



            let log = []
            if (file) {
                for (let index = 0; index < outputWidths.length; index++) {
                    const width = outputWidths[index];

                    let resizeResult = await sharp.resize(filePath, width, output, extension);
                    logger.info(resizeResult);
                    resizeResult["taskId"] = nanoid(idlength),
                    resizeResult["start_ts"] = start_ts;
                    log.push(resizeResult)
                    // db.saveTask(resizeResult)
                }
                for (let index = 0; index < log.length; index++) {
                    const element = log[index];
                    db.saveTask(element)
                }
                res.status(200).json({
                    tasks: log
                });
            } else {
                throw new Error(`No such file ${req.body.file} found in directory`)
            }

        }

    } catch (err) {
        logger.error(err.message);
        res.status(500).json(err.message);
    }
};