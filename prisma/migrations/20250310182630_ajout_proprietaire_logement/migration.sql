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
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "villeProp" TEXT NOT NULL,
    "statut" TEXT NOT NULL,
    "revenuFiscal" INTEGER NOT NULL,
    "nombrePersonnes" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Logement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "adresse" TEXT NOT NULL,
    "codePostal" TEXT NOT NULL,
    "ville" TEXT,
    "anneeConstruction" INTEGER,
    "surface" REAL,
    "type" TEXT NOT NULL,
    "modeChauffage" TEXT,
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
