"use strict";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import morgan from "morgan";
import db from "./db/models/index.js";
import ListingsRouter from "./routers/listingsRouter.js";
import ListingsController from "./controllers/listingsController.js";
import FirebaseController from "./controllers/firebaseController.js";
import FirebaseRouter from "./routers/firebaseRouter.js";

//initialize env file
dotenv.config();

const PORT = process.env.PORT;
const app = express();

//destructure models from db
const { court } = db;

//initialize controllers, controllers passes in models
const listingsController = new ListingsController(court);
const firebaseController = new FirebaseController(court);

//initialize routers, routers passes in controllers
const listingsRouter = new ListingsRouter(listingsController).routes();
const firebaseRouter = new FirebaseRouter(firebaseController).routes();

// logger
app.use(morgan("dev"));

// cors
app.use(cors());

// parse req.body
app.use(express.json());

// use routers
app.use("/listings", listingsRouter);
app.use("/firebase", firebaseRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
