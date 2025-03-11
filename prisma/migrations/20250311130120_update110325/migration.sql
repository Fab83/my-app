-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Proprietaire" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nom" TEXT NOT NULL,
    "prenom" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "physMorale" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telephone" TEXT,
    "adresseProp" TEXT NOT NULL,
    "villeProp" TEXT NOT NULL,
    "statut" TEXT NOT NULL,
    "revenuFiscal" INTEGER NOT NULL,
    "nombrePersonnes" INTEGER NOT NULL
);
INSERT INTO "new_Proprietaire" ("adresseProp", "createdAt", "email", "id", "nom", "nombrePersonnes", "physMorale", "prenom", "revenuFiscal", "statut", "telephone", "villeProp") SELECT "adresseProp", "createdAt", "email", "id", "nom", "nombrePersonnes", "physMorale", "prenom", "revenuFiscal", "statut", "telephone", "villeProp" FROM "Proprietaire";
DROP TABLE "Proprietaire";
ALTER TABLE "new_Proprietaire" RENAME TO "Proprietaire";
CREATE UNIQUE INDEX "Proprietaire_email_key" ON "Proprietaire"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
