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
import { auth } from "express-oauth2-jwt-bearer";
import UsersController from "./controllers/usersController.js";
import UsersRouter from "./routers/usersRouter.js";
import ReviewsController from "./controllers/reviewsController.js";
import ReviewsRouter from "./routers/reviewsRouter.js";

//initialize env file
dotenv.config();

const PORT = process.env.PORT;
const app = express();

// adding auth0
const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
});

//destructure models from db
const { court, booking, user, review } = db;

//initialize controllers, controllers passes in models
const courtsController = new CourtsController(court);
const firebaseController = new FirebaseController(court, user);
const bookingsController = new BookingsController(booking, court);
const usersController = new UsersController(user);
const reviewsController = new ReviewsController(review, booking, user);

//initialize routers, routers passes in controllers, auth
const courtsRouter = new CourtsRouter(courtsController, checkJwt).routes();
const firebaseRouter = new FirebaseRouter(firebaseController).routes();
const bookingsRouter = new BookingsRouter(
  bookingsController,
  checkJwt
).routes();
const usersRouter = new UsersRouter(usersController).routes();
const reviewsRouter = new ReviewsRouter(reviewsController, checkJwt).routes();

// logger
app.use(morgan("dev"));

// cors
app.use(cors());

// parse req.body
app.use(express.json());

// use routers
app.use("/courts", courtsRouter);
app.use("/firebase", checkJwt, firebaseRouter);
app.use("/bookings", bookingsRouter);
app.use("/users", checkJwt, usersRouter);
app.use("/reviews", reviewsRouter);

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}!`);
});
