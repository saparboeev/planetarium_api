const { json } = require("express");
const User = require("../models/user.model");
const uuid = require("uuid");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const apiKey = uuid.v4();

    const user = await User.create({
      name,
      email,
      password,
      apiKey,
    });

    const token = user.generateJwtToken();

    res.status(201).json({
      success: true,
      data: user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fields cannot be left empty",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "You haven't registered in our system!",
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = user.generateJwtToken();

    return res.status(200).json({
      success: true,
      data: user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getProfilePage = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(201).json({
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const fieldsToUpdate = {
      name: req.body.name || user.name,
      email: req.body.email || user.email,
    };

    const updatedDetails = await User.findByIdAndUpdate(
      req.user._id,
      fieldsToUpdate
    );

    res.status(200).json({
      success: true,
      data: updatedDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!(await user.matchPassword(req.body.currentPassword))) {
      return res.status(403).json({
        success: false,
        message: "Your old password is incorrect",
      });
    }

    user.password = req.body.newPassword;
    await user.save();

    const token = user.generateJwtToken();

    return res.status(200).json({
      success: true,
      data: user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
