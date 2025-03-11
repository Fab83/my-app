const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Liste tous les logements
exports.getAllLogements = async (req, res, next) => {
  try {
    const logements = await prisma.logement.findMany({
      include: { proprietaire: true },
    });
    res.render("logements/index", { logements });
  } catch (error) {
    next(error);
  }
};

// Détail d'un logement par ID
exports.getLogementById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const logement = await prisma.logement.findUnique({
      where: { id },
      include: { proprietaire: true },
    });
    if (!logement) {
      return res.status(404).json({ error: "Logement non trouvé" });
    }
    res.json(logement);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Création d'un logement
exports.createLogement = async (req, res, next) => {
  const data = req.body;
  data.proprietaireId = parseInt(data.proprietaireId); // assure-toi que c'est un int
  try {
    await prisma.logement.create({ data });
    res.redirect("/logements");
  } catch (error) {
    next(error); // Transmettre l'erreur au middleware de gestion des erreurs
  }
};

exports.renderNewLogementForm = async (req, res) => {
  const proprietaires = await prisma.proprietaire.findMany();
  res.render("logements/nouveau", { proprietaires });
};

// Mise à jour d'un logement
exports.updateLogement = async (req, res, next) => {
  const id = parseInt(req.params.id);
  const data = {
    adresse: req.body.adresse,
    ville: req.body.ville,
    typeLogement: req.body.typeLogement,
    typeBatiment: req.body.typeBatiment,
    anneeConstruction: req.body.anneeConstruction,
    surfaceAvant: req.body.surfaceAvant,
    surfaceApres: req.body.surfaceApres,
    modeChauffage: req.body.modeChauffage,
    chauffageSecondaire: req.body.chauffageSecondaire,
    chauffageEmission: req.body.chauffageEmission,
    VMC: req.body.VMC,
    ProductionEnr: req.body.ProductionEnr,
    niveauIsolationSol: req.body.niveauIsolationSol,
    niveauIsolationMurs: req.body.niveauIsolationMurs,
    niveauIsolationToit: req.body.niveauIsolationToit,
    vitrage: req.body.vitrage,
    eauChaude: req.body.eauChaude,
    classeDPE: req.body.classeDPE,
    projet: req.body.projet,
    // proprietaireId: parseInt(data.proprietaireId), // assure-toi que c'est un int
  };
  // data.proprietaireId = parseInt(data.proprietaireId); // assure-toi que c'est un int
  
  try {
    await prisma.logement.update({
      where: { id },
      data,
    });
    res.redirect("/logements");
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    res.status(400).send("Erreur lors de la mise à jour");
  }
};

// Affiche le formulaire de modification d'un logement
exports.renderEditLogementForm = async (req, res, next) => {
  const id = parseInt(req.params.id);
  try {
    const logement = await prisma.logement.findUnique({
      where: { id },
      include: { proprietaire: true },
    });
    const proprietaires = await prisma.proprietaire.findMany();
    res.render("logements/modifier", { logement, proprietaires });
  } catch (error) {
    next(error);
  }
};


// Suppression d'un logement
exports.deleteLogement = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.logement.delete({ where: { id } });
    res.json({ message: "Logement supprimé" });
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la suppression" });
  }
};
