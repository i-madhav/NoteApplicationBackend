import { Router } from "express";
import routerUser from "./user.route.js";
import routerNote from "./note.route.js";
const routerIndex = Router();

routerIndex.use("/user",routerUser);
routerIndex.use("/document",routerNote);

export default routerIndex;