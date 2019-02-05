import typeDefs from "../src/graphql/typedefs";
import resolvers from "../src/graphql/resolvers";

const { ApolloServer } = require('apollo-server');

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }: { url: string}) => {
  console.log(`🚀 Server ready at ${url}`)
});