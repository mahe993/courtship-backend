import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const PORT = process.env.PORT;
const app = express();

// logger
app.use(morgan("dev"));

// cors
app.use(cors());

// parse req.body
app.use(express.json());

// use routers

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
