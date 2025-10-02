import { PrismaClient } from "../lib/generated/prisma";

const prisma = new PrismaClient();

async function main() {
  console.log("Start seeding...");

  // Seed activities from the old JSON data
  const activities = [
    {
      slug: "first-first-activity",
      title: "First First Activity",
      shortDescription: "This is a short description for the first activity.",
      longDescription:
        "This is a longer, more detailed description of the first activity. It can contain multiple paragraphs and rich text formatting if you decide to add a Markdown parser later.",
      imageUrl: "/uploads/1751966129623-890418859.jpg",
    },
    {
      slug: "second-activity",
      title: "Second Activity",
      shortDescription: "A brief look at our second amazing activity.",
      longDescription:
        "Here we dive deep into the details of the second activity. This is where you can explain the what, why, and how of the event or project.",
      imageUrl: "/placeholder.svg",
    },
  ];

  for (const activity of activities) {
    const result = await prisma.activity.upsert({
      where: { slug: activity.slug },
      update: {},
      create: activity,
    });
    console.log(`Created/Updated activity: ${result.title}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
