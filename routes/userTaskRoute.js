const Router = require("express");
const router = new Router();
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  appointTask,
  commitTime,
  getUserByTaskId,
  dismissTask,
  fetchTaskWithUsers,
} = require("../controller/userTaskController");

router.post("/", roleMiddleware("ADMIN"), appointTask);
router.patch("/", commitTime);
router.get("/:taskId", getUserByTaskId);
router.patch("/dismiss", roleMiddleware("ADMIN"), dismissTask);
router.get("/", roleMiddleware("ADMIN"), fetchTaskWithUsers);

module.exports = router;
