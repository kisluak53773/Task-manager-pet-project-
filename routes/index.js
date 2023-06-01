const Router = require("express");
const router = Router();
const userRouter = require("./userRouter");
const taskRouter = require("./taskRoute");
const projectRouter = require("./projectRoute");
const userTaskRouter = require("./userTaskRoute");
const userProjectRouter = require("./userProjectRoute");

router.use("/user", userRouter);
router.use("/task", taskRouter);
router.use("/userTask", userTaskRouter);
router.use("/project", projectRouter);
router.use("/userProject", userProjectRouter);

module.exports = router;
