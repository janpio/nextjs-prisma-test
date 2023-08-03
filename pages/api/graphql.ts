import { schema } from '../../graphql/schema';
import { createYoga } from 'graphql-yoga';
import { NextApiRequest, NextApiResponse } from 'next';

export default createYoga<{
  req: NextApiRequest;
  res: NextApiResponse;
}>({
  schema,
  graphqlEndpoint: process.env.GRAPHQL_API, // '/api/graphql',
});

export const config = {
  api: {
    bodyParser: false,
  },
};
