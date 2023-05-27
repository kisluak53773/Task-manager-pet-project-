const { Task } = require("../models/models");
const errorHandler = require("../error/errorHandler");

async function createTask(req, res, next) {
  try {
    const { id, name, description, endDate } = req.body;
    if (!id || !name || !description || !endDate) {
      return next(errorHandler.badRequest("Lacking task data"));
    }
    const task = await Task.create({
      name,
      description,
      endDate: Date.parse(endDate),
      projectId: id,
    });
    return res.status(200).json(task);
  } catch (error) {
    return next(errorHandler.internalError("Something went wrong"));
  }
}

async function getTasks(req, res, next) {
  try {
    const tasks = await Task.findAll();
    if (tasks.length === 0) {
      return res.status(204);
    }
    return res.status(200).json(tasks);
  } catch (error) {
    return next(errorHandler.internalError("Something went wrong"));
  }
}

async function getTaskById(req, res, next) {
  try {
    const { projectId } = req.params;
    if (!projectId) {
      return next(errorHandler.badRequest("Project id is absent"));
    }
    const tasks = await Task.findAll({ where: { projectId } });
    if (tasks.length === 0) {
      return res.status(204);
    }
    return res.status(200).json(tasks);
  } catch (error) {
    return next(errorHandler.internalError("Something went wrong"));
  }
}

async function updateTaskById(req, res, next) {
  try {
    const { taskId } = req.params;
    const { progress, status, name, description } = req.body;
    if (!taskId || !progress || !status || !name || !description) {
      return next(errorHandler.badRequest("Lacking data to update"));
    }
    const task = await Task.update(
      {
        name,
        description,
        progress,
        status,
      },
      { where: { id: taskId } }
    );
    return res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return next(errorHandler.internalError("Something went wrong"));
  }
}

async function deleteTask(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return next(errorHandler.badRequest("Id is absent"));
    }
    const project = await Task.findOne({ where: { id } });
    if (!project) {
      return next(errorHandler.badRequest("There is no such project"));
    }
    const deletedProject = await Task.destroy({ where: { id } });
    return res.status(200).json(deletedProject);
  } catch (error) {
    return next(errorHandler.internalError("Something went wrong"));
  }
}

module.exports = {
  getTasks,
  createTask,
  getTaskById,
  updateTaskById,
  deleteTask,
};
