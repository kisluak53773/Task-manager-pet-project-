const Router = require("express");
const router = new Router();
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  getTasks,
  createTask,
  getTaskById,
  updateTaskById,
  deleteTask,
} = require("../controller/taskController");

router.post("/", roleMiddleware("ADMIN"), createTask);
router.get("/", getTasks);
router.get("/:projectId", getTaskById);
router.patch("/:taskId", roleMiddleware("ADMIN"), updateTaskById);
router.delete("/:id", roleMiddleware("ADMIN"), deleteTask);

module.exports = router;
