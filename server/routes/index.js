const router = require("express").Router();
const userRouter = require("./userRouter");
const adminRouter = require("./adminRouter");

router.use("/users", userRouter);
router.use("/admins", adminRouter);

module.exports = router;
