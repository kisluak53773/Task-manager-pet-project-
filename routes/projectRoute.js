const Router = require("express");
const router = new Router();
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  getProjects,
  createProject,
  deleteProject,
} = require("../controller/projectController");

router.post("/", roleMiddleware("ADMIN"), createProject);
router.get("/", getProjects);
router.delete("/:id", roleMiddleware("ADMIN"), deleteProject);

module.exports = router;
