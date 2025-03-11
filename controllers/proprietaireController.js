const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

//Liste des propriétaires
exports.getAllProprietaires = async (req, res) => {
  try {
    const proprietaires = await prisma.proprietaire.findMany({
      include: { logements: true },
    });

    res.render("proprietaires/index", {
      proprietaires,
      user: req.user, // Passe user à la vue !
    });
  } catch (error) {
    console.error("Erreur récupération propriétaires :", error);
    res.status(500).send("Erreur serveur");
  }
};

//Détail d'un propriétaire par Id
exports.getProprietaireById = async (req, res) => {
  try {
    const proprietaire = await prisma.proprietaire.findUnique({
      where: { id },
      include: { logements: true },
    });
    if (!proprietaire) {
      return res.status(404).json({ error: "Propriétaire non trouvé" });
    }
    res.json(proprietaire);
  } catch (error) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

//Création propriétaire
exports.createProprietaire = async (req, res) => {
  const data = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    physMorale: req.body.physMorale,
    email: req.body.email,
    telephone: req.body.telephone || null,
    adresseProp: req.body.adresseProp,
    villeProp: req.body.villeProp,
    statut: req.body.statut,
    revenuFiscal: parseInt(req.body.revenuFiscal), // ➡️ conversion en Int
    nombrePersonnes: parseInt(req.body.nombrePersonnes), // ➡️ conversion en Int
  };

  console.log("Données envoyées à Prisma :", data);

  try {
    await prisma.proprietaire.create({ data });
    res.redirect("/proprietaires");
  } catch (error) {
    console.error("Erreur lors de la création :", error);
    res.status(400).send("Erreur lors de la création");
  }
};

exports.renderNewProprietaireForm = async (req, res) => {
  try {
    console.log("Accès à la page nouveau propriétaire"); // Debug
    res.render("proprietaires/nouveau");
  } catch (error) {
    console.error("Erreur dans renderNewProprietaireForm :", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Mise à jour d'un propriétaire
exports.updateProprietaire = async (req, res) => {
  const id = parseInt(req.params.id);

  const data = {
    nom: req.body.nom,
    prenom: req.body.prenom,
    physMorale: req.body.physMorale,
    email: req.body.email,
    telephone: req.body.telephone || null,
    adresseProp: req.body.adresseProp,
    villeProp: req.body.villeProp,
    statut: req.body.statut,
    revenuFiscal: parseInt(req.body.revenuFiscal), // ➡️ conversion en Int
    nombrePersonnes: parseInt(req.body.nombrePersonnes), // ➡️ conversion en Int
  };

  try {
    await prisma.proprietaire.update({
      where: { id },
      data,
    });

    res.redirect("/proprietaires");
  } catch (error) {
    console.error("Erreur lors de la mise à jour :", error);
    res.status(400).send("Erreur lors de la mise à jour");
  }
};

// Suppression d'un propriétaire
exports.deleteProprietaire = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.proprietaire.delete({ where: { id } });
    res.json({ message: "Propriétaire supprimé" });
  } catch (error) {
    res.status(400).json({ error: "Erreur lors de la suppression" });
  }
};

exports.renderEditProprietaireForm = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const proprietaire = await prisma.proprietaire.findUnique({
      where: { id },
    });

    if (!proprietaire) {
      return res.status(404).send("Propriétaire non trouvé");
    }

    res.render("proprietaires/modifier", { proprietaire });
  } catch (error) {
    console.error("Erreur chargement formulaire édition :", error);
    res.status(500).send("Erreur serveur");
  }
};
