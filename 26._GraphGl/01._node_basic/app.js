import express from 'express';
import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';


// graphql graphql-http
const app = express();
// to use index.html file
app.use(express.static('public'));
const PORT = process.env.PORT || 8080;



/**
 * Construct a GraphQL schema and define the necessary resolvers.
 *
 * type Query {
 *   hello: String
 * }
 */
const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'Query',
      fields: {
        hello: {
          type: GraphQLString,
          resolve: () => 'world',
        },
      },
    }),
  });

import { createHandler } from 'graphql-http/lib/use/express';
// Notify that grapphql used **all**
app.all('/graphql', createHandler({ schema }));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});