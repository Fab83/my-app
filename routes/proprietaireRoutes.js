const express = require("express");
const router = express.Router();
const proprietaireController = require("../controllers/proprietaireController");

//CRUD propriéaire
router.get("/", proprietaireController.getAllProprietaires);
router.get("/nouveau", proprietaireController.renderNewProprietaireForm);
router.get("/:id", proprietaireController.getProprietaireById);
router.get("/:id/modifier", proprietaireController.renderEditProprietaireForm);
router.post("/", proprietaireController.createProprietaire);
router.put("/:id", proprietaireController.updateProprietaire);
router.delete("/", proprietaireController.deleteProprietaire);

module.exports = router;
