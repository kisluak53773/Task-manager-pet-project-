const { Project } = require("../models/models");
const errorHandler = require("../error/errorHandler");

async function createProject(req, res, next) {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return next(errorHandler.badRequest("Lacking project data"));
    }
    const project = await Project.create({ title, description });
    return res.status(200).json(project);
  } catch (error) {
    return next(errorHandler.internalError("Something went wrong"));
  }
}

async function getProjects(req, res, next) {
  try {
    const projects = await Project.findAll();
    if (projects.length === 0) {
      return next(
        errorHandler.badRequest("There are no projects to be returned")
      );
    }
    return res.status(200).json(projects);
  } catch (error) {
    return next(errorHandler.internalError("Something went wrong"));
  }
}

async function deleteProject(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      return next(errorHandler.badRequest("Id is absent"));
    }
    const project = await Project.findOne({ where: { id } });
    if (!project) {
      return next(errorHandler.badRequest("There is no such project"));
    }
    const deletedProject = await Project.destroy({ where: { id } });
    return res.status(200).json(deletedProject);
  } catch (error) {
    return next(errorHandler.internalError("Something went wrong"));
  }
}

module.exports = {
  createProject,
  getProjects,
  deleteProject,
};
