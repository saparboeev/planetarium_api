const { Router } = require("express");
const {
  createPlanet,
  getAllPlanets,
  updatePlanets,
  deletePlanet,
} = require("../controllers/planet.controller");
const { protected, adminAccess, apiKeyAccess } = require("../middlewares/auth");
const upload = require("../utils/fileUpload");
const router = Router();

router.post(
  "/planets",
  protected,
  adminAccess,
  upload.single("image"),
  createPlanet
);

router.get("/planets", apiKeyAccess, getAllPlanets);
router.put("/planets/:id", protected, adminAccess, updatePlanets);
router.delete("/planets/:id", protected, adminAccess, deletePlanet);

module.exports = router;
