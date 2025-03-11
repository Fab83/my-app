-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Proprietaire" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "physMorale" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "adresseProp" TEXT,
    "villeProp" TEXT,
    "statut" TEXT NOT NULL,
    "revenuFiscal" INTEGER NOT NULL,
    "nombrePersonnes" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Logement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "adresse" TEXT NOT NULL,
    "ville" TEXT,
    "typeLogement" TEXT NOT NULL,
    "typeBatiment" TEXT NOT NULL,
    "anneeConstruction" TEXT,
    "surfaceAvant" TEXT,
    "surfaceApres" TEXT,
    "modeChauffage" TEXT,
    "chauffageSecondaire" TEXT NOT NULL,
    "chauffageEmission" TEXT NOT NULL,
    "VMC" TEXT NOT NULL,
    "ProductionEnr" TEXT NOT NULL,
    "niveauIsolationSol" TEXT NOT NULL,
    "niveauIsolationMurs" TEXT NOT NULL,
    "niveauIsolationToit" TEXT NOT NULL,
    "vitrage" TEXT NOT NULL,
    "eauChaude" TEXT,
    "classeDPE" TEXT NOT NULL,
    "projet" TEXT NOT NULL,
    "proprietaireId" INTEGER NOT NULL,
    CONSTRAINT "Logement_proprietaireId_fkey" FOREIGN KEY ("proprietaireId") REFERENCES "Proprietaire" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Proprietaire_email_key" ON "Proprietaire"("email");
