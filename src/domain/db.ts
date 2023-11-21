import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
  ],
});

if(process.env.NODE_ENV?.toLowerCase() === "development") {
  prisma.$on('query', (e) => {
    // console.log(`Prisma query: \x1b[33m ${e.query.replace(/"public"\./g, '')} \x1b[0m`);
  });
}

export default prisma;