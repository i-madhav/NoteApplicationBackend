import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))
app.use(express.json({limit:"200kb"}));
app.use(express.urlencoded({extended:true , limit:"15kb"}));
app.use(cookieParser());

import routerIndex from "./routes/index.route.js";
app.use("/api/v1/",routerIndex);
export {app};