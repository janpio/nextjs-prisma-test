import { builder } from '../builder';

builder.prismaObject('Dictionary', {
  fields: (t) => ({
    id: t.exposeID('id'),
    word: t.exposeString('word'),
    translation: t.exposeString('translation'),
    explanation: t.exposeString('explanation', { nullable: true }),
  }),
});

builder.queryField('Dictionary', (t) =>
  t.prismaField({
    type: ['Dictionary'],
    resolve: (query, _parent, _args, _context, _info) =>
      prisma.dictionary.findMany({ ...query, orderBy: [{ word: 'asc' }] }),
  }),
);

builder.queryField('DictionaryItem', (t) =>
  t.prismaField({
    type: 'Dictionary',
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: async (query, _parent, args, _info) => {
      const dictionaryItem = await prisma.dictionary.findUnique({
        ...query,
        where: {
          id: Number(args.id),
        },
      });
      if (!dictionaryItem) {
        throw new Error('Element inexistent');
      }
      return dictionaryItem;
    },
  }),
);

const DictionaryInput = builder.inputType('DictionaryInput', {
  fields: (t) => ({
    name: t.string({ required: true }),
    word: t.string({ required: true }),
    translation: t.string({ required: true }),
    explanation: t.string(),
  }),
});

builder.mutationField('addDictionaryItem', (t) =>
  t.prismaField({
    type: 'Dictionary',
    args: {
      input: t.arg({ type: DictionaryInput, required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.dictionary.create({
        ...query,
        data: {
          // name: args.input.name,
          word: args.input.word,
          translation: args.input.translation,
          explanation: args.input.explanation,
        },
      }),
  }),
);

builder.mutationField('deleteDictionaryItem', (t) =>
  t.prismaField({
    type: 'Dictionary',
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.dictionary.delete({
        ...query,
        where: {
          id: Number(args.id),
        },
      }),
  }),
);

builder.mutationField('updateDictionaryItemName', (t) =>
  t.prismaField({
    type: 'Dictionary',
    args: {
      id: t.arg.int({ required: true }),
      word: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.dictionary.update({
        ...query,
        data: {
          word: args.word,
        },
        where: {
          id: Number(args.id),
        },
      }),
  }),
);

builder.mutationField('updateDictionaryItemTranslation', (t) =>
  t.prismaField({
    type: 'Dictionary',
    args: {
      id: t.arg.int({ required: true }),
      translation: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.dictionary.update({
        ...query,
        data: {
          translation: args.translation,
        },
        where: {
          id: Number(args.id),
        },
      }),
  }),
);

builder.mutationField('updateDictionaryItemExplanation', (t) =>
  t.prismaField({
    type: 'Dictionary',
    args: {
      id: t.arg.int({ required: true }),
      explanation: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, _info) =>
      prisma.dictionary.update({
        ...query,
        data: {
          explanation: args.explanation,
        },
        where: {
          id: Number(args.id),
        },
      }),
  }),
);
