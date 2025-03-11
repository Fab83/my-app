const express = require("express");
const session = require("express-session");
const app = express();
const port = process.env.PORT || 80;

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const proprietaireRoutes = require("./routes/proprietaireRoutes");
const logementRoutes = require("./routes/logementRoutes");
const methodOverride = require("method-override");

// ------------------------------
// Middleware de protection
// ------------------------------
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

// ------------------------------
// Passport strategy configuration
// ------------------------------
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { username } });

      if (!user) {
        return done(null, false, { message: "Utilisateur non trouvé" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return done(null, false, { message: "Mot de passe incorrect" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// ------------------------------
// App configuration
// ------------------------------
app.set("view engine", "ejs");
app.set("views", "./views");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
// ------------------------------
// Session & Passport initialization
// ------------------------------
app.use(
  session({
    secret: "ton_super_secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// ------------------------------
// Routes d'authentification
// ------------------------------
app.get("/login", (req, res) => {
  res.render("auth/login");
});

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

app.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
});

// ------------------------------
// Routes protégées
// ------------------------------
app.get("/", ensureAuthenticated, (req, res) => {
  res.render("index", { user: req.user });
});

// Autres routes
app.use("/proprietaires", ensureAuthenticated, proprietaireRoutes);
app.use("/logements", ensureAuthenticated, logementRoutes);

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// ------------------------------
// Démarrage serveur
// ------------------------------

// app.listen(3000, () => {
//   console.log("Serveur lancé sur http://localhost:3000");
// });

app.listen(port, "0.0.0.0", () => {
  console.log(`Serveur lancé sur http://localhost:${port}`);
});
