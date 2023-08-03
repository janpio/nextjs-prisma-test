import prisma from '../lib/prisma';

export const resolvers = {
  Query: {
    Dictionary: () => {
      return prisma.dictionary.findMany();
    },
    Topics: () => {
      return prisma.topics.findMany();
    },
  },
};
