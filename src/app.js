import express from "express";
import dotenv from "dotenv";
import router from "./routes/index.js";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use("/", router);

app.listen(port, () => console.log(`Server running on port ${port}`));
