import { config } from "dotenv";
config();
import { createServer } from "http";
import express from "express";
import cors from "cors";
import connectDB from "./lib/connectDB";
import routes from "./routes";
const app = express()
const server = createServer(app);

const port = process.env.PORT || 7000;

connectDB();
app.use(express.json());
app.use(cors());
app.use("/api", routes())

server.listen(port, () => {
    console.log(`Server started listening at: ${port}`)
})