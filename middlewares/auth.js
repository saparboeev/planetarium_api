const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
const { findOne } = require("../models/planet.model");

exports.protected = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized to access this route",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.adminAccess = (req, res, next) => {
  try {
    if (!req.user.adminStatus) {
      return res.status(403).json({
        success: false,
        message: "You are not admin",
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.apiKeyAccess = async (req, res, next) => {
  try {
    let key;

    if (req.headers.apikey) {
      key = req.headers.apikey;
    }

    if (!key) {
      return res.status(403).json({
        success: false,
        message: "No Api key to access this route",
      });
    }

    const user = await User.findOne({ apiKey: key });

    if (!user) {
      return res.status(403).json({
        message: "No user found by this API key",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: "Please activate your status to get response",
      });
    }
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
