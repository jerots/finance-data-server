import gql from "graphql-tag";

// The GraphQL schema
const typeDefs = gql`
  type Query {
    ticker(tickerName: String!): JSON
  }

  scalar JSON
`;


export default typeDefs;