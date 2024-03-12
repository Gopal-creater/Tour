import Tour from "../models/tourModel.js";
import APIFeatures from "../utils/apiFeatures.js";

class TourController {
  aliasTopTours(req, res, next) {
    req.query.limit = 5;
    req.query.sort = "-ratingsAverage,price";
    req.query.fields = "name,price,ratingsAverage,summary,difficulty";
    next();
  }

  async getAllTours(req, res) {
    try {
      //Execute query
      const features = new APIFeatures(Tour.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
      const tours = await features.query;

      res.status(200).json({
        status: "success",
        results: tours.length,
        data: {
          tours,
        },
      });
    } catch (err) {
      console.log(err);
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  }

  async getTour(req, res) {
    try {
      const tour = await Tour.findById(req.params.id);

      res.status(200).json({
        status: "success",
        data: {
          tour,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  }

  async createTour(req, res) {
    try {
      //Create tour data in db
      const newTour = await Tour.create(req.body);

      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: err,
      });
    }
  }

  async updateTour(req, res) {
    try {
      const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        status: "success",
        data: {
          tour,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  }

  async deleteTour(req, res) {
    try {
      const tour = await Tour.findByIdAndDelete(req.params.id);
      console.log(tour);
      res.status(200).json({
        status: "success",
        data: {
          tour,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  }

  async getTourStats(req, res) {
    try {
      const stats = await Tour.aggregate([
        {
          $match: { ratingsAverage: { $gte: 4.5 } },
        },
        {
          $group: {
            _id: "$difficulty",
            numTours: { $sum: 1 },
            numRatings: { $sum: "$ratingsQuantity" },
            avgRating: { $avg: "$ratingsAverage" },
            avgPrice: { $avg: "$price" },
            minPrice: { $min: "$price" },
            maxPrice: { $max: "$price" },
          },
        },
        {
          $sort: { avgPrice: 1 },
        },
      ]);
      res.status(200).json({
        status: "success",
        data: {
          stats,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: "fail",
        message: err,
      });
    }
  }

  async getMonthlyplan(req, res) {
    try {
      const year = req.params.year * 1;
      const plan = await Tour.aggregate([
        {
          $unwind: "$startDates",
        },
        {
          $match: {
            startDates: {
              $gte: new Date(`${year}-01-01`),
              $lte: new Date(`${year}-12-31`),
            },
          },
        },
        {
          $group: {
            _id: { $month: "$startDates" },
            numTourStarts: { $sum: 1 },
            tours: { $push: "$name" },
          },
        },
        {
          $addFields: { month: "$_id" },
        },
        {
          $project: {
            _id: 0,
          },
        },
        {
          $sort: { numTourStarts: -1 },
        },
        {
          $limit: 12,
        },
      ]);

      res.status(200).json({
        status: "success",
        data: {
          plan,
        },
      });
    } catch (err) {}
  }
}

// Exporting an instance of the TourController class
const tourController = new TourController();
export default tourController;
