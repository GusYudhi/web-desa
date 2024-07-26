import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { config } from "dotenv";

config();

const prisma = new PrismaClient();

async function main() {
  const password = await hash(process.env.ADMIN_PASSWORD || "password", 12);

  const user = await prisma.user.upsert({
    where: { email: "admin-web-desa@gmail.com" },
    update: {
      password: password,
    },
    create: {
      email: "admin-web-desa@gmail.com",
      password: password,
    },
  });

  console.log(user);
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });