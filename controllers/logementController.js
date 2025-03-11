const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Liste tous les logements
exports.getAllLogements = async (req, res) => {
  try {
    const logements = await prisma.logement.findMany({
      include: { proprietaire: true },
    });
    res.json(logements);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
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
exports.updateLogement = async (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  try {
    const logement = await prisma.logement.update({
      where: { id },
      data,
    });
    res.json(logement);
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la mise à jour" });
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
