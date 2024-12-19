import { Router } from "express";
import { serverActive, signinUser, signoutUser, signupUser, updateUser, userInformation } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const routerUser = Router();
routerUser.route("/signup").post(signupUser);
routerUser.route("/signin").post(signinUser);
routerUser.route("/serveractive").get(serverActive);
routerUser.route("/signout").post(verifyJWT , signoutUser);
routerUser.route("/update").put(verifyJWT,updateUser);
routerUser.route("/me").get(verifyJWT,userInformation);

export default routerUser;