import Axios from "axios";
import _ from "lodash";
import { TickerData } from "../ticker/Ticker";

export default class financialModelingPrepAPI {
  private static ROOT_PATH = "https://financialmodelingprep.com/api/v3/";

  private static ROUTES: {
    [resourceType: string]: { route: string; path: string };
  } = {
    profile: { route: "company/profile/$ticker", path: "profile" },
    incomeStatement: {
      route: "financials/income-statement/$ticker",
      path: "financials"
    },
    balanceSheetStatement: {
      route: "financials/balance-sheet-statement/$ticker",
      path: "financials"
    },
    cashFlowStatement: {
      route: "financials/cash-flow-statement/$ticker",
      path: "financials"
    }
  };

  static async getSingleTickerFinanceData(
    resourceType: string,
    tickerName: string
  ) {
    try {
      const routeDetails = this.ROUTES[resourceType];
      if (!routeDetails) {
        throw new Error("Invalid path");
      }
      const replacedRoute = routeDetails.route.replace("$ticker", tickerName);
      const result = await Axios.get(this.ROOT_PATH + replacedRoute, {
        responseType: "document"
      });
      return _.get(result, `data.${routeDetails.path}`);
    } catch (err) {
      console.error(err);
    }
  }

  static async getAllTickerFinanceData(
    tickerName: string
  ): Promise<TickerData> {
    const tickerData: TickerData = {};
    const promises = _.map(
      this.ROUTES,
      async (
        routeDetails: { route: string; path: string },
        resourceType: string
      ) => {
        const data = await this.getSingleTickerFinanceData(
          resourceType,
          tickerName
        );
        // tickerData[key] = _.get(data, tickerName);
        tickerData[resourceType] = data;
      }
    );
    await Promise.all(promises);

    return tickerData;
  }
}
