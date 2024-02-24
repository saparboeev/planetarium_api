const { Router } = require("express");
const {
  addNewStar,
  getStars,
  getOneStar,
  updateStars,
  deleteStars,
} = require("../controllers/star.controller");
const { protected, adminAccess, apiKeyAccess } = require("../middlewares/auth");
const upload = require("../utils/fileUpload");
const router = Router();

router.get("/stars", apiKeyAccess, getStars);
router.post(
  "/stars",
  protected,
  adminAccess,
  upload.single("image"),
  addNewStar
);
router.get("/stars/:id", apiKeyAccess, getOneStar);
router.put("/stars/:id", protected, adminAccess, updateStars);
router.delete("/stars/:id", protected, adminAccess, deleteStars);

module.exports = router;
