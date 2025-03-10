const express = require("express");
const session = require("express-session");
const passport = require("passport");

const proprietaireRoutes = require("./routes/proprietaireRoutes");
const logementRoutes = require("./routes/logementRoutes");

const methodOverride = require("method-override");

const app = express(); // <-- La déclaration de app est ici !

app.set("view engine", "ejs");
app.set("views", "./views"); // normalement par défaut, mais au cas où

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/test", (req, res) => {
  res.send("Test route OK");
});

// Middlewares globaux
app.use(express.json()); // <-- Ici c'est OK
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

// Session et Passport
app.use(
  session({
    secret: "ton_super_secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/proprietaires", proprietaireRoutes);
app.use("/logements", logementRoutes);

app.use(methodOverride("_method"));

// Démarrage serveur
app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});
