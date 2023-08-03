import { PrismaClient } from '@prisma/client';

import { covenants } from '../components/config/covenants';
import { dictionary } from '../components/config/dictionary';
import { godNames } from '../components/config/godNames';
import { godPromises } from '../components/config/godPromises';
import { prophecies } from '../components/config/prophecies';
import { topics } from '../components/config/topics';

const prisma = new PrismaClient();

type refType = {
  ref: string;
  tooltip: string;
};

type hintType = {
  res: string;
  ref: string;
  tooltip: string;
};

type godNameRefType = {
  ref: string;
  tooltip: string;
};

const seedCovenants = async () => {
  await prisma.covenant.deleteMany();

  for (const c of covenants) {
    const item = await prisma.covenant.create({
      data: {
        covenant: c.covenant,
        ref: c.ref,
      },
    });
    console.log('--------------------\n', item);
  }
};

const seedDictionary = async () => {
  await prisma.dictionary.deleteMany();

  for (const d of dictionary) {
    const item = await prisma.dictionary.create({
      data: {
        // name: d.name,
        word: d.word,
        translation: d.translation,
        explanation: d.explanation,
      },
    });
    console.log('--------------------\n', item);
  }
};

const seedGodNames = async () => {
  // await prisma.dictionary.deleteMany();

  for (const d of godNames) {
    const ref2: godNameRefType[] = [];

    d.ref?.map((r) => {
      const item: godNameRefType = {
        ref: r.ref,
        tooltip: r.tooltip,
      };
      ref2.push(item);
    });
    console.log('ref: ', ref2);

    await prisma.godName.create({
      data: {
        // name: d.name,
        nameOfGod: d.nameOfGod,
        translation: d.translation,
        ref: { create: ref2 },
      },
    });
  }
};

const seedTopics = async () => {
  // await prisma.topics.deleteMany();
  // await prisma.questionRef.deleteMany();
  // await prisma.questionHint.deleteMany();

  for (const t of topics) {
    const ref2: refType[] = [];
    const hint2: hintType[] = [];

    // console.log('--------------------\n', t.id, t.ord, t.question);
    t.ref.map((r) => {
      const item: refType = {
        ref: r.ref,
        tooltip: r.tooltip,
      };
      ref2.push(item);
    });
    console.log('ref: ', ref2);

    t.hint.map((h) => {
      const item: hintType = { res: h.res, ref: h.ref, tooltip: h.tooltip };
      hint2.push(item);
    });
    console.log('hint: ', hint2);

    await prisma.topic.create({
      data: {
        ord: t.ord,
        question: t.question,
        ref: { create: ref2 },
        hint: { create: hint2 },
      },
    });
  }
};

const seedGodPromises = async () => {
  // await prisma.dictionary.deleteMany();

  for (const p of godPromises) {
    const item = await prisma.godPromise.create({
      data: {
        promise: p.promise,
        ref: p.ref,
      },
    });
    console.log('--------------------\n', item);
  }
};

const seedProphecies = async () => {
  // await prisma.dictionary.deleteMany();

  for (const p of prophecies) {
    const item = await prisma.prophecie.create({
      data: {
        prophecie: p.prophecie,
        ref: p.ref,
        fulfilled: p.fulfilled,
        history: p.history,
      },
    });
    console.log('--------------------\n', item);
  }
};

// ====================================================

const readCovenants = async () => {
  const item = await prisma.covenant.findMany({
    select: {
      id: true,
      covenant: true,
      ref: true,
    },
  });
  console.log('--------------------\n', item);
};

const readDictionary = async () => {
  const item = await prisma.dictionary.findMany({
    select: {
      id: true,
      // name: true,
      word: true,
      translation: true,
      explanation: true,
    },
  });
  console.log('--------------------\n', item);
};

const readGodNames = async () => {
  const item = await prisma.godName.findMany({
    select: {
      id: true,
      // name: true,
      nameOfGod: true,
      translation: true,
    },
  });
  console.log('--------------------\n', item);
};

// ====================================================

/*
UPDATE Dictionary SET `word`=`name`;
select * from Dictionary;

UPDATE GodName SET `nameOfGod`=`name`;
select * from GodName;
*/

/*
const createTopics = async () => {
  // await prisma.topics.deleteMany();
  // await prisma.questionRef.deleteMany();
  // await prisma.questionHint.deleteMany();

  for (const t of topics) {
    await prisma.topic.create({
      data: {
        ord: t.ord,
        question: t.question,
        ref: {},
        hint: {},
      },
    });
  }
};

const updateAllTopics = async () => {
  for (const t of topics) {
    const ref2: refType[] = [];
    const hint2: hintType[] = [];

    // console.log('--------------------\n', t.id, t.ord, t.question);
    t.ref.map((r) => {
      const item: refType = { ref: r.ref, tooltip: r.tooltip };
      ref2.push(item);
    });
    // console.log('ref: ', ref2);

    t.hint.map((h) => {
      const item: hintType = { res: h.res, ref: h.ref, tooltip: h.tooltip };
      hint2.push(item);
    });
    // console.log('hint: ', hint2);

    await prisma.topic.update({
      data: {
        ref: { create: ref2 },
        hint: { create: hint2 },
      },
      where: {
        // id: t.id + 28,
        id: t.id,
      },
    });
  }
};

const addField = async () => {
  await prisma.$executeRaw`ALTER TABLE "Topics" ADD COLUMN "ord2" INTEGER;`;
};

const dropTable = async () => {
  await prisma.$executeRaw`DROP schema QuestionRef`;
};

const readTopics = async () => {
  const item = await prisma.topic.findMany({
    select: {
      id: true,
      question: true,
      ord: true,
      ref: true,
      hint: true,
    },
  });
  console.log('--------------------\n', item);
};

const updateQuestionHint = async () => {
  await prisma.questionHint.update({
    data: {
      res: topics[1].hint[0].res,
      ref: topics[1].hint[0].ref,
      tooltip: topics[1].hint[0].tooltip,
    },
    where: {
      id: 2,
    },
  });
};

const readQuestionHint = async () => {
  const item = await prisma.questionHint.findFirst({
    cursor: {
      id: 2,
    },
  });
  console.log(item);
};

const readQuestionHints = async () => {
  // const result = await prisma.$queryRaw`SELECT name FROM dev.db WHERE type = "table";`
  const result = await prisma.$queryRaw`SELECT * FROM QuestionHint;`;
  console.log(result);
};

const readQuestionRefs = async () => {
  // const result = await prisma.$queryRaw`SELECT name FROM dev.db WHERE type = "table";`
  const result = await prisma.$queryRaw`SELECT * FROM QuestionRef;`;
  console.log(result);
};

const addQuestionHint21 = async () => {
  await prisma.questionHint.upsert({
    update: {
      res: topics[1].hint[0].res,
      ref: topics[1].hint[0].ref,
      tooltip: topics[1].hint[0].tooltip,
    },
    create: {
      res: '=====================',
      ref: '---------------------',
      tooltip: '.................',
    },
    where: {
      id: 2,
    },
  });
};

const addQuestionHint22 = async () => {
  // Added the record twice
  await prisma.questionHint.create({
    data: {
      res: topics[1].hint[1].res,
      ref: topics[1].hint[1].ref,
      tooltip: topics[1].hint[1].tooltip,
      topicId: 2,
    },
  });
};

const addQuestionRef41 = async () => {
  await prisma.questionRef.update({
    data: {
      ref: topics[3].ref[0].ref,
      tooltip: topics[3].ref[0].tooltip,
    },
    where: {
      id: 6,
    },
  });
};

const addQuestionHint41 = async () => {
  await prisma.questionHint.upsert({
    update: {
      res: topics[3].hint[0].res,
      ref: topics[3].hint[0].ref,
      tooltip: topics[3].hint[0].tooltip,
    },
    create: {
      res: '=====================',
      ref: '---------------------',
      tooltip: '.................',
    },
    where: {
      id: 4,
    },
  });
};

const addQuestionHint42 = async () => {
  await prisma.questionHint.upsert({
    update: {
      res: topics[3].hint[1].res,
      ref: topics[3].hint[1].ref,
      tooltip: topics[3].hint[1].tooltip,
      topicId: 4,
    },
    create: {
      res: '=====================',
      ref: '---------------------',
      tooltip: '.................',
    },
    where: {
      id: 22,
    },
  });
};

const readGodPromises = async () => {
  const item = await prisma.godPromise.findMany({
    select: {
      id: true,
      promise: true,
      ref: true,
    },
  });
  console.log('--------------------\n', item);
};
*/

async function main() {
  // seedCovenants();
  // seedDictionary();
  // seedGodNames();
  // seedGodPromises();
  // seedProphecies();
  // seedTopics();
  // ======================
  // readCovenants();
  // readDictionary();
  // readGodNames();
  // createTopics();
  // updateTopics();
  // addField();
  // dropTable();
  // readTopics();
  // readGodPromises();
  // addQuestionHint21();
  // addQuestionHint22();
  // addQuestionRef41();
  // addQuestionHint41();
  // addQuestionHint42();
  // readQuestionHint();
  // readQuestionHints();
  // readQuestionRefs();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// npx prisma db seed
