const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("26282628/Bb", 10); // 🔒 Choisis un vrai mot de passe ici !

  const user = await prisma.user.create({
    data: {
      username: "admin",
      email: "fabrice.viteau@gmail.com",
      password: hashedPassword,
    },
  });

  console.log("Utilisateur créé :", user);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
