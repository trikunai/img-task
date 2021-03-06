const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const path = require("path");
const adapter = new FileSync(path.resolve(__dirname,'db.json'))
const db = low(adapter)


// db.defaults({ tasks: [] }).write()
module.exports.getByTaskId = async (taskId) =>{
    try {
        const task = db.get('tasks')
            .find({ taskId: taskId })
            .value()

        return task;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.saveTask = async (task) =>{
    try {
        const savedTask = db.get('tasks')
            .push({
                taskId: task.taskId,
                sourcePath: task.sourcePath,
                outputPath: task.outputPath,
                start_ts: task.start_ts,
                end_ts: task.end_ts,
                width: task.width,
                md5: task.md5,
            })
            .write()

        // return await this.getByTaskId(task.taskId)
        return true;
    } catch (error) {
        console.error(error);
        throw error;
    }
}