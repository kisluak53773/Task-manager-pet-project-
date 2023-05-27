const Router = require("express");
const roleMiddleware = require("../middleware/roleMiddleware");
const router = new Router();
const {
  registration,
  login,
  auth,
  getAllUsers,
} = require("../controller/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/registration", registration);
router.post("/login", login);
router.get("/auth", authMiddleware, auth);
router.get("/getAll", roleMiddleware("ADMIN"), getAllUsers);

module.exports = router;
