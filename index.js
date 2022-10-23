"use strict";
import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import morgan from "morgan";
import db from "./db/models/index.js";
import CourtsRouter from "./routers/courtsRouter.js";
import CourtsController from "./controllers/courtsController.js";
import FirebaseController from "./controllers/firebaseController.js";
import FirebaseRouter from "./routers/firebaseRouter.js";
import BookingsController from "./controllers/bookingsController.js";
import BookingsRouter from "./routers/bookingsRouter.js";

//initialize env file
dotenv.config();

const PORT = process.env.PORT;
const app = express();

//destructure models from db
const { court, booking } = db;

//initialize controllers, controllers passes in models
const courtsController = new CourtsController(court);
const firebaseController = new FirebaseController(court);
const bookingsController = new BookingsController(booking, court);

//initialize routers, routers passes in controllers
const courtsRouter = new CourtsRouter(courtsController).routes();
const firebaseRouter = new FirebaseRouter(firebaseController).routes();
const bookingsRouter = new BookingsRouter(bookingsController).routes();

// logger
app.use(morgan("dev"));

// cors
app.use(cors());

// parse req.body
app.use(express.json());

// use routers
app.use("/courts", courtsRouter);
app.use("/firebase", firebaseRouter);
app.use("/bookings", bookingsRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
