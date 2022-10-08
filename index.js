"use strict";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import morgan from "morgan";
import ListingsRouter from "./routers/listingsRouter.js";
import ListingsController from "./controllers/listingsController.js";
import db from "./db/models/index.js";

//initialize env file
dotenv.config();

const PORT = process.env.PORT;
const app = express();

//destructure models from db
const { model } = db;

//initialize controllers, controllers take in model as parameter
const listingsController = new ListingsController(model);

//initialize routers, routers take in controller as parameter
const listingsRouter = new ListingsRouter(listingsController).routes();

// logger
app.use(morgan("dev"));

// cors
app.use(cors());

// parse req.body
app.use(express.json());

// use routers
app.use("/listings", listingsRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
