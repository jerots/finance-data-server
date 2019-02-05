import gql from "graphql-tag";

// The GraphQL schema
const typeDefs = gql`
  type Query {
    ticker(tickerName: String!): Ticker
  }

  type Ticker {
    name: String
    incomeStatement: JSON
    balanceSheet: JSON
    dcf: JSON
    rating: JSON
    cashFlowStatement: JSON
    profile: JSON
  }

  scalar JSON
`;


export default typeDefs;