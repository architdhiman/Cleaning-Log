require("dotenv/config");
const { PrismaPg } = require("@prisma/adapter-pg");
const { PrismaClient } = require("../src/generated/prisma/client");

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  await prisma.equipment.createMany({
    data: [
      {
        name: "Reactor Tank 01",
        code: "RT-001",
        status: "ACTIVE",
      },
      {
        name: "Mixing Tank 02",
        code: "MT-002",
        status: "ACTIVE",
      },
      {
        name: "Storage Tank 03",
        code: "ST-003",
        status: "RETIRED",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });