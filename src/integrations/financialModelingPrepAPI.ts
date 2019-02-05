import Axios from "axios";
import _ from "lodash";
import Ticker, { TickerData } from "../ticker/Ticker";

export default class financialModelingPrepAPI {
    private static ROOT_PATH = "https://financialmodelingprep.com/api/"

    private static INCOME_STATEMENT = 0;
    private static BALANCE_SHEET = 1;
    private static CASH_FLOW_STATEMENT = 2;
    private static PROFILE = 3;
    private static PRICE = 4;
    private static RATING = 5;
    private static DISCOUNTED_CASH_FLOW = 6;
    private static CRYPTOCURRENCY_SINGLE = 7;
    private static FOREX_SINGLE = 8;
    private static MAJOR_INDEX_SINGLE = 9;


    private static SINGLE_TICKER_ROUTES: String[] = [
        "financials/income-statement/$ticker",
        "financials/balance-sheet-statement/$ticker",
        "financials/cash-flow-statement/$ticker",
        "company/profile/$ticker",
        "company/price/$ticker",
        "company/rating/$ticker",
        "company/discounted-cash-flow/$ticker",
        "cryptocurrency/$ticker",
        "forex/$ticker",
        "majors-indexes/$ticker",
    ]

    private static GENERIC_ROUTES = {
        "most-active": "stock/actives",
        "most-gainer": "stock/gainers",
        "most-loser": "stock/losers",
        "cryptocurrency": "cryptocurrency",
        "forex": "forex",
        "majors-indexes": "majors-indexes",
        "sectors-performance": "sectors-performance",
    }

    private static BATCH_ROUTES = {
        "batch-price": "company/price/$ticker",
    }

    static async getSingleTickerFinanceData(resourceType: number, tickerName: string) {
        const path = this.SINGLE_TICKER_ROUTES[resourceType];
        if (!path) {
            throw new Error("Invalid path");
        }
        const replacedPath = path.replace("$ticker", tickerName);
        const result = await Axios.get(this.ROOT_PATH + replacedPath, { responseType: "document" });

        const jsonString = result.data.replace(/<pre>|\\n/g, "");
        let finalJson;
        try {
            finalJson = JSON.parse(jsonString);
        } catch (e) {
            console.error(e);
        }
        return finalJson;
    }

    static async getAllTickerFinanceData(tickerName: string): Promise<TickerData> {


        const ROUTES: { [s: string]: number } = {
            "incomeStatement": this.INCOME_STATEMENT,
            "balanceSheet": this.BALANCE_SHEET,
            "cashFlowStatement": this.CASH_FLOW_STATEMENT,
            "profile": this.PROFILE,
            "price": this.PRICE,
            "rating": this.RATING,
            "dcf": this.DISCOUNTED_CASH_FLOW
        }

        const tickerData: TickerData = {};
        const promises = _.map(ROUTES, async (resourceType: number, key: string) => {
            const data = await this.getSingleTickerFinanceData(resourceType, tickerName)
            tickerData[key] = _.get(data, tickerName);
        })
        await Promise.all(promises);

        return tickerData;
    }
}



