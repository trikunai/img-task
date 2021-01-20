
const Task = require('./../controllers/task');

module.exports = (router, logger) => {

    router.get('/task/:taskId', Task.getTaskId);

    router.post('/task/', Task.saveTask);
};