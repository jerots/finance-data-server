import Axios from "axios";
import _ from "lodash";

export default class financialModelingPrepAPI {
    private static ROOT_PATH = "https://financialmodelingprep.com/api/"
    private static SINGLE_TICKER_ROUTES: { [s: string]: string } = {
        "income-statement": "financials/income-statement/$ticker",
        "balance-sheet-statement": "financials/balance-sheet-statement/$ticker",
        "cash-flow-statement": "financials/cash-flow-statement/$ticker",
        "profile": "company/profile/$ticker",
        "price": "company/price/$ticker",
        "rating": "company/rating/$ticker",
        "discounted-cash-flow": "company/discounted-cash-flow/$ticker",
        "cryptocurrency-single": "cryptocurrency/$ticker",
        "forex-single": "forex/$ticker",
        "majors-indexes-single": "majors-indexes/$ticker",
    }

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

    static async getSingleTickerFinanceData(resourceType: string, tickerName: string) {
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

    static async getAllTickerFinanceData(tickerName: string) {

        const ROUTES = [
            "income-statement",
            "balance-sheet-statement",
            "cash-flow-statement",
            "profile",
            "price",
            "rating",
            "discounted-cash-flow"
        ]
        const tickerData = {}
        const promises = _.map(ROUTES, async (resourceType) => {
            const data = await this.getSingleTickerFinanceData(resourceType, tickerName)
            _.merge(tickerData, _.values(data));
        })
        await Promise.all(promises);
        return tickerData;
    }
}

