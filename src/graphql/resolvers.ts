import TickerController from "../ticker/controller";

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    ticker: (parent: undefined, args: { tickerName: string }, context: {}, info: {}) => {
      return TickerController.get(args.tickerName)
    },
    tickers: (parent: undefined, args: {}, context: {}, info: {}) => {
      return TickerController.getList()
    },
  },

};

export default resolvers;