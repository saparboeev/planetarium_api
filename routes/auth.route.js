const { Router } = require("express");
const {
  register,
  login,
  getProfilePage,
  updateDetails,
  updatePassword,
} = require("../controllers/auth.controller");
const { protected, adminAccess, apiKeyAccess } = require("../middlewares/auth");
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", protected, getProfilePage);
router.put("/profile", protected, updateDetails);
router.put("/profile/password", protected, updatePassword);

module.exports = router;
