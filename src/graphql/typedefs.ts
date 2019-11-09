import gql from "graphql-tag";

// The GraphQL schema
const typeDefs = gql`
  type Query {
    ticker(tickerName: String!): Ticker
    tickers: [JSON]
  }

  type Ticker {
    name: String
    incomeStatement: JSON
    balanceSheetStatement: JSON
    cashFlowStatement: JSON
    profile: JSON
  }

  scalar JSON
`;

export default typeDefs;
