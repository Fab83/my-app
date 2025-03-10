const express = require("express");
const router = express.Router();
const logementController = require("../controllers/logementController");

// CRUD Logement
router.get("/", logementController.getAllLogements);
router.get("/nouveau", logementController.renderNewLogementForm);
router.get("/:id", logementController.getLogementById);
router.post("/", logementController.createLogement);
router.put("/:id", logementController.updateLogement);
router.delete("/:id", logementController.deleteLogement);

module.exports = router;
