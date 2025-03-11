/*
  Warnings:

  - You are about to drop the column `codePostal` on the `Logement` table. All the data in the column will be lost.
  - You are about to drop the column `surface` on the `Logement` table. All the data in the column will be lost.
  - Added the required column `ProductionEnr` to the `Logement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `VMC` to the `Logement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chauffageEmission` to the `Logement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `chauffageSecondaire` to the `Logement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `niveauIsolationMurs` to the `Logement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `niveauIsolationSol` to the `Logement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `niveauIsolationToit` to the `Logement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeBatiment` to the `Logement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `typeLogement` to the `Logement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vitrage` to the `Logement` table without a default value. This is not possible if the table is not empty.
  - Added the required column `adresseProp` to the `Proprietaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `physMorale` to the `Proprietaire` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Logement" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "adresse" TEXT NOT NULL,
    "ville" TEXT,
    "typeLogement" TEXT NOT NULL,
    "typeBatiment" TEXT NOT NULL,
    "anneeConstruction" INTEGER,
    "surfaceAvant" REAL,
    "surfaceApres" REAL,
    "type" TEXT NOT NULL,
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
INSERT INTO "new_Logement" ("adresse", "anneeConstruction", "classeDPE", "eauChaude", "id", "modeChauffage", "projet", "proprietaireId", "type", "ville") SELECT "adresse", "anneeConstruction", "classeDPE", "eauChaude", "id", "modeChauffage", "projet", "proprietaireId", "type", "ville" FROM "Logement";
DROP TABLE "Logement";
ALTER TABLE "new_Logement" RENAME TO "Logement";
CREATE TABLE "new_Proprietaire" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "physMorale" TEXT NOT NULL DEFAULT 'indéfini', -- Ajout de la valeur par défaut
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "adresseProp" TEXT NOT NULL DEFAULT 'indéfini', -- Ajout de la valeur par défaut
    "villeProp" TEXT NOT NULL,
    "statut" TEXT NOT NULL,
    "revenuFiscal" INTEGER NOT NULL,
    "nombrePersonnes" INTEGER NOT NULL
);
INSERT INTO "new_Proprietaire" ("createdAt", "email", "id", "nom", "nombrePersonnes", "prenom", "revenuFiscal", "statut", "telephone", "villeProp") SELECT "createdAt", "email", "id", "nom", "nombrePersonnes", "prenom", "revenuFiscal", "statut", "telephone", "villeProp" FROM "Proprietaire";
DROP TABLE "Proprietaire";
ALTER TABLE "new_Proprietaire" RENAME TO "Proprietaire";
CREATE UNIQUE INDEX "Proprietaire_email_key" ON "Proprietaire"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;