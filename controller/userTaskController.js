const { UserTask, User, Task } = require("../models/models");
const errorHandler = require("../error/errorHandler");

async function appointTask(req, res, next) {
  try {
    const { userId, taskId } = req.body;
    console.log("userId: " + userId + " taskId: " + taskId);
    await UserTask.create({
      userId,
      taskId,
    });
    return res.status(200);
  } catch (error) {
    return next(errorHandler.internalError("Something went wrong"));
  }
}

async function commitTime(req, res, next) {
  try {
    const { taskId, userId, spentTime } = req.body;
    if (!taskId || !userId || !spentTime) {
      return next(errorHandler.badRequest("Lacking data to update"));
    }
    const task = await UserTask.update(
      {
        spentTime,
      },
      { where: { taskId, userId } }
    );
    return res.status(200);
  } catch (error) {
    return next(errorHandler.internalError("Something went wrong"));
  }
}

async function getUserByTaskId(req, res, next) {
  try {
    const { taskId } = req.params;
    if (!taskId) {
      return next(errorHandler.badRequest("Lacking data to update"));
    }
    const userTask = await UserTask.findOne({
      where: { taskId, status: "assigned" },
    });
    let user = await User.findOne({
      where: { id: userTask.dataValues.userId },
    });
    const data = {
      ...user.dataValues,
      spentTime: userTask.dataValues.spentTime,
    };
    return res.status(200).json(data);
  } catch (error) {
    return next(errorHandler.internalError("Something went wrong"));
  }
}

async function dismissTask(req, res, next) {
  try {
    const { taskId, userId } = req.body;
    if (!taskId || !userId) {
      return next(errorHandler.badRequest("Lacking data to update"));
    }
    const task = await UserTask.update(
      {
        status: "dismissed",
      },
      { where: { taskId, userId } }
    );
    return res.status(200);
  } catch (error) {
    return next(errorHandler.internalError("Something went wrong"));
  }
}

async function fetchTaskWithUsers(req, res, next) {
  console.log("Fetching task with users...");
  try {
    var data = [];
    const tasks = await Task.findAll();
    for (const task of tasks) {
      const userTasks = await UserTask.findAll({
        where: { taskId: task.dataValues.id },
      });
      var users = [];
      for (const userTask of userTasks) {
        const user = await User.findOne({
          where: { id: userTask.dataValues.id },
        });
        if (user) {
          users.push({
            ...user.dataValues,
            spentTime: userTask.dataValues.spentTime,
          });
        }
      }
      data.push({ ...task.dataValues, users });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return next(errorHandler.internalError("Something went wrong"));
  }
}

module.exports = {
  appointTask,
  commitTime,
  getUserByTaskId,
  dismissTask,
  fetchTaskWithUsers,
};
