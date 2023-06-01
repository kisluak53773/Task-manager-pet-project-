const Router = require("express");
const router = new Router();
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  appointProject,
  dismissProject,
} = require("../controller/userProjectController");

router.post("/", roleMiddleware("ADMIN"), appointProject);
router.delete("/", roleMiddleware("ADMIN"), dismissProject);

module.exports = router;
