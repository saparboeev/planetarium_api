const Planet = require("../models/planet.model");
const Star = require("../models/star.model");

exports.createPlanet = async (req, res) => {
  try {
    const star = await Star.findOne({ name: req.body.star });
    const newPlanet = await Planet.create({
      name: req.body.name,
      distanceToStar: req.body.distanceToStar,
      diametr: req.body.diametr,
      yearDuration: req.body.yearDuration,
      dayDuration: req.body.dayDuration,
      satelites: req.body.satelites,
      temperature: req.body.temperature,
      sequenceNumber: req.body.sequenceNumber,
      image: "uploads/" + req.file.filename,
      star: star._id,
    });

    await Star.findOneAndUpdate(
      { name: req.body.star },
      { $push: { planets: newPlanet._id } },
      { new: true, upsert: true }
    );

    res.status(201).json({
      success: true,
      data: newPlanet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getAllPlanets = async (req, res) => {
  try {
    const planets = await Planet.find();

    res.status(201).json({
      success: true,
      data: planets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updatePlanets = async (req, res) => {
  try {
    const planet = await Planet.findById(req.params.id);

    const updatePlanet = await Planet.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name || planet.name,
        diametr: req.body.diametr || planet.diametr,
        distanceToStar: req.body.distanceToStar || planet.distanceToStar,
        temperature: req.body.temperature || planet.temperature,
        yearDuration: req.body.yearDuration || planet.yearDuration,
        dayDuration: req.body.dayDuration || planet.dayDuration,
        satelites: req.body.satelites || planet.satelites,
        temperature: req.body.temperature || planet.temperature,
        sequenceNumber: req.body.sequenceNumber || planet.sequenceNumber,
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      data: updatePlanet,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deletePlanet = async (req, res) => {
  try {
    await Planet.findByIdAndDelete(req.params.id);

    res.status(201).json({
      message: "File deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
