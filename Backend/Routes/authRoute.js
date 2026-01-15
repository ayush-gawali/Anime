import express from "express";
import {getUser, login, register } from "../Controllers/authController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const authRoute = express.Router();

authRoute.post("/register",register);

authRoute.post("/login",login);

authRoute.get("/getUser",authMiddleware,getUser);

export default authRoute