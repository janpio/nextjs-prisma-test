// import { PrismaClient } from '@prisma/client';
import { PrismaClient } from '@prisma/client/edge';

let prisma: PrismaClient;

declare global {
  var prisma: PrismaClient;
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;

/*
======================================================================

// https://github.com/prisma/accelerate-speed-test/blob/main/lib/prisma.ts

import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

function makePrisma() {
  return new PrismaClient().$extends(withAccelerate());
}

const globalForPrisma = global as unknown as {
  prisma: ReturnType<typeof makePrisma>;
};

export const prisma = globalForPrisma.prisma ?? makePrisma();

if (process.env.NODE_ENV !== 'production')
  globalForPrisma.prisma = makePrisma();

  // Type error: Cannot find name 'prisma'.
*/
