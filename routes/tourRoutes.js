import express from "express";
import tourController from "../controllers/tourController.js";

const tourRouter = express.Router();
tourRouter
  .route("/top-5-cheap")
  .get(tourController.aliasTopTours, tourController.getAllTours);

tourRouter.route("/stats").get(tourController.getTourStats);
tourRouter.route("/monthly-plan/:year").get(tourController.getMonthlyplan);

tourRouter
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);

tourRouter
  .route("/:id")
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

export default tourRouter;
