import financialModelingPrepAPI from "../src/integrations/financialModelingPrepAPI";
import TickerController from "../src/ticker/controller";

const { ApolloServer, gql } = require('apollo-server');

// The GraphQL schema
const typeDefs = gql`
  type Query {
    ticker(tickerName: String!): JSON
  }

  scalar JSON
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    ticker: (parent: undefined, args: { tickerName: string}, context: {}, info: {})=> { 
      return TickerController.get(args.tickerName)
    }
  },

};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }: { url: string}) => {
  console.log(`🚀 Server ready at ${url}`)
});