import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import {
  PrismaClient,
  Locale,
  SectionType,
  SocialPlatform,
} from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting database seed...");

  // Themes
  const themes = await Promise.all([
    prisma.theme.upsert({
      where: { name: "Minimal" },
      update: {},
      create: {
        name: "Minimal",
        layoutKey: "minimal",
        colors: {
          primary: "#111827",
          secondary: "#6B7280",
          background: "#FFFFFF",
          text: "#111827",
        },
        isDefault: true,
      },
    }),

    prisma.theme.upsert({
      where: { name: "Modern" },
      update: {},
      create: {
        name: "Modern",
        layoutKey: "modern",
        colors: {
          primary: "#2563EB",
          secondary: "#64748B",
          background: "#F8FAFC",
          text: "#0F172A",
        },
        isDefault: false,
      },
    }),

    prisma.theme.upsert({
      where: { name: "Developer" },
      update: {},
      create: {
        name: "Developer",
        layoutKey: "developer",
        colors: {
          primary: "#22C55E",
          secondary: "#94A3B8",
          background: "#0F172A",
          text: "#E2E8F0",
        },
        isDefault: false,
      },
    }),
  ]);

  const minimalTheme = themes.find(
    (theme) => theme.name === "Minimal",
  );

  if (!minimalTheme) {
    throw new Error("Default theme was not created.");
  }

  // User
  const user = await prisma.user.upsert({
    where: {
      email: "demo@portfolio-builder.dev",
    },
    update: {},
    create: {
      email: "demo@portfolio-builder.dev",
      name: "Demo User",
    },
  });

  // Portfolio
  const portfolio = await prisma.portfolio.upsert({
    where: {
      slug: "demo-portfolio",
    },
    update: {},
    create: {
      userId: user.id,
      name: "Demo Portfolio",
      slug: "demo-portfolio",
      displayName: "Demo Developer",
      defaultLocale: Locale.PT_BR,
      themeId: minimalTheme.id,
    },
  });

  // Portfolio translations
  await prisma.portfolioTranslation.upsert({
    where: {
      portfolioId_locale: {
        portfolioId: portfolio.id,
        locale: Locale.PT_BR,
      },
    },
    update: {},
    create: {
      portfolioId: portfolio.id,
      locale: Locale.PT_BR,
      headline: "Desenvolvedor de Software",
      bio: "Desenvolvedor apaixonado por tecnologia e criação de produtos digitais.",
      seoTitle: "Demo Developer | Portfólio",
      seoDescription:
        "Portfólio profissional de um desenvolvedor de software.",
    },
  });

  await prisma.portfolioTranslation.upsert({
    where: {
      portfolioId_locale: {
        portfolioId: portfolio.id,
        locale: Locale.EN,
      },
    },
    update: {},
    create: {
      portfolioId: portfolio.id,
      locale: Locale.EN,
      headline: "Software Developer",
      bio: "Developer passionate about technology and building digital products.",
      seoTitle: "Demo Developer | Portfolio",
      seoDescription:
        "Professional portfolio of a software developer.",
    },
  });

  // Sections
  const sections = [
    SectionType.ABOUT,
    SectionType.SKILLS,
    SectionType.PROJECTS,
    SectionType.EXPERIENCE,
    SectionType.LINKS,
  ];

  for (const [position, type] of sections.entries()) {
    await prisma.section.upsert({
      where: {
        portfolioId_type: {
          portfolioId: portfolio.id,
          type,
        },
      },
      update: {
        position,
        isVisible: true,
      },
      create: {
        portfolioId: portfolio.id,
        type,
        position,
        isVisible: true,
      },
    });
  }

  // Social links
  const socialLinks = [
    {
      platform: SocialPlatform.GITHUB,
      url: "https://github.com/demo",
      position: 0,
    },
    {
      platform: SocialPlatform.LINKEDIN,
      url: "https://linkedin.com/in/demo",
      position: 1,
    },
  ];

  for (const socialLink of socialLinks) {
    const existing = await prisma.socialLink.findFirst({
      where: {
        portfolioId: portfolio.id,
        platform: socialLink.platform,
      },
    });

    if (!existing) {
      await prisma.socialLink.create({
        data: {
          portfolioId: portfolio.id,
          ...socialLink,
        },
      });
    }
  }

  // Skills
  const skills = [
    { name: "TypeScript", category: "Languages", position: 0 },
    { name: "Node.js", category: "Backend", position: 1 },
    { name: "React", category: "Frontend", position: 2 },
    { name: "PostgreSQL", category: "Database", position: 3 },
    { name: "Prisma", category: "ORM", position: 4 },
  ];

  for (const skill of skills) {
    const existing = await prisma.skill.findFirst({
      where: {
        portfolioId: portfolio.id,
        name: skill.name,
      },
    });

    if (!existing) {
      await prisma.skill.create({
        data: {
          portfolioId: portfolio.id,
          ...skill,
        },
      });
    }
  }

  // Project
  const project = await prisma.project.findFirst({
    where: {
      portfolioId: portfolio.id,
    },
  });

  const demoProject =
    project ??
    (await prisma.project.create({
      data: {
        portfolioId: portfolio.id,
        repoUrl: "https://github.com/demo/project",
        liveUrl: "https://example.com",
        technologies: ["TypeScript", "React", "Node.js"],
        featured: true,
        position: 0,
      },
    }));

  await prisma.projectTranslation.upsert({
    where: {
      projectId_locale: {
        projectId: demoProject.id,
        locale: Locale.PT_BR,
      },
    },
    update: {},
    create: {
      projectId: demoProject.id,
      locale: Locale.PT_BR,
      title: "Projeto Demo",
      description: "Um projeto demonstrativo para o portfólio.",
    },
  });

  await prisma.projectTranslation.upsert({
    where: {
      projectId_locale: {
        projectId: demoProject.id,
        locale: Locale.EN,
      },
    },
    update: {},
    create: {
      projectId: demoProject.id,
      locale: Locale.EN,
      title: "Demo Project",
      description: "A demonstration project for the portfolio.",
    },
  });

  console.log("✅ Database seed completed.");
  console.log(`   User: ${user.email}`);
  console.log(`   Portfolio: ${portfolio.slug}`);
  console.log(`   Themes: ${themes.length}`);
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });