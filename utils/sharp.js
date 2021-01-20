const sharp = require('sharp');
const fs = require('fs');
const logger = require('./logger');
const md5 = require('./md5');
const path = require('path');
sharp.cache(false);

module.exports.resize = async(filePath, width, outputBase, extension) => {
    try {
        const _md5 = await md5.getFileMD5(filePath);
        const extension = path.extname(filePath);
        const outputPath = `${outputBase}/${width}`;
        const outputFile = `${outputPath}/${_md5}${extension}`;
        if (!fs.existsSync(outputPath)){
            fs.mkdirSync(outputPath, { recursive: true });
        }
        // await fs.copyFileSync(filePath, outputFile);
        const buffer = await sharp(filePath)
        .resize({
            width,
            fit: sharp.fit.contain,
        })
        .toFile(outputFile);
        // .toBuffer()

        // await sharp(buffer).toFile(outputFile);
        // const result = await fs.readFileSync(`${__dirname}/default.json`);

        return {
            sourcePath: filePath,
            outputPath: outputFile,
            md5: _md5,
            width,
            end_ts: Math.floor(Date.now() / 1000)
        };
    } catch (err) {
        logger.error(err);
        return false;
    }
}