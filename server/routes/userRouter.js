const userRouter = require("express").Router();
const userControllers = require("../controllers/userControllers");
const Authentication = require("../middlewares/auth");
const multerImage = require("../middlewares/multerImage");

userRouter.get("/items", userControllers.getItems);
userRouter.post("/googleLogin", userControllers.loginGoogle);
userRouter.get("/items/homes", userControllers.dataForHome);
userRouter.get("/items/:id", userControllers.getItem);

userRouter.use(Authentication);

userRouter.get("/myads", userControllers.getMyAds);
userRouter.get("/items-barters", userControllers.dataForBarter);

userRouter.post(
  "/addItem",
  userControllers.addItem
);

userRouter.post(
  "/myImage",
  multerImage().array("image"),
  userControllers.postImage
);

userRouter.post(
  "/items",
  multerImage().array("image"),
  userControllers.postItems
);

userRouter.post("/roomBarter", userControllers.postRoomBarter);

userRouter.get("/roomBarter", userControllers.getRoomBarter);

userRouter.delete("/items/:id", userControllers.deleteItem);

userRouter.patch("/roomBarter/:id", userControllers.patchRoomBarter);

module.exports = userRouter;
