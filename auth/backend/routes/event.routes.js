import express from "express";
import { fetchEvents } from "../controllers/event.controller.js";
import { verifyAccessToken
        
 } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/fetchEvents", verifyAccessToken, fetchEvents);

export default router;
