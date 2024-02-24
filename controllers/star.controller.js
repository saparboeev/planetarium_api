const Star = require("../models/star.model");

exports.getStars = async (req, res) => {
  try {
    const stars = await Star.find();

    res.status(200).json({
      success: true,
      data: stars,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.addNewStar = async (req, res) => {
  try {
    const { name, diametr, temperature, massa, image } = req.body;
    const star = await Star.create({
      name,
      diametr,
      temperature,
      massa,
      image,
    });

    res.status(201).json({
      success: true,
      data: star,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.getOneStar = async (req, res) => {
  try {
    const star = await Star.findById(req.params.id);

    res.status(200).json({
      success: true,
      data: star,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updateStars = async (req, res) => {
  try {
    const star = await Star.findById(req.params.id);

    const updateStar = await Star.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name || star.name,
        diametr: req.body.diametr || star.diametr,
        massa: req.body.massa || star.massa,
        temperature: req.body.temperature || star.temperature,
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      data: updateStar,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.deleteStars = async (req, res) => {
  try {
    await Star.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Deleted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
