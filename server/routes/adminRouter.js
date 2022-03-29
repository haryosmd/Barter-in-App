const adminControllers = require("../controllers/adminControllers");
const Authentication = require("../middlewares/auth");
const { Authorization, AuthorizationV1 } = require("../middlewares/authz");
const adminRouter = require("express").Router();

adminRouter.post("/login", adminControllers.login);
adminRouter.use(Authentication);
adminRouter.get("/items", adminControllers.getItems);
adminRouter.post("/register", AuthorizationV1, adminControllers.register);
adminRouter.patch("/items/:id", Authorization, adminControllers.patchItem);

module.exports = adminRouter;
