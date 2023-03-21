import { Router, Request, Response } from "express";

import userRoutes from "./src/usermanagement";
import orderRoutes from "./src/ordermanagement";

const router = Router();
export default () =>
    router.get("/health-check", (req: Request, res: Response)=> {
        res.send("Server is Healthy.")
    })
    .use("/users", userRoutes())
    .use("/orders", orderRoutes())