const { UserProject } = require("../models/models");
const errorHandler = require("../error/errorHandler");

async function appointProject(req, res, next) {
  try {
    const { userId, projectId } = req.body;
    const task = await UserProject.create({
      userId,
      projectId,
    });
    return res.status(200).json(task);
  } catch (error) {
    console.log(error);
    return next(errorHandler.internalError("Something went wrong"));
  }
}

async function dismissProject(req, res, next) {
  try {
    const { userId, projectId } = req.body;
    console.log("userId: " + userId + " projectId: " + projectId);
    if (!userId || !projectId) {
      return next(errorHandler.badRequest("Id is absent"));
    }
    const deletedProject = await UserProject.destroy({
      where: { userId, projectId },
    });
    return res.status(200).json(deletedProject);
  } catch (error) {
    return next(errorHandler.internalError("Something went wrong"));
  }
}

module.exports = {
  appointProject,
  dismissProject,
};
