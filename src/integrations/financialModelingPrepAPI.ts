import Axios from "axios";

export default class financialModelingPrepAPI {
    static ROOT_PATH = "https://financialmodelingprep.com/api/"
    static SINGLE_TICKER_ROUTES: { [s: string]: string } = {
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

    static GENERIC_ROUTES = {
        "most-active": "stock/actives",
        "most-gainer": "stock/gainers",
        "most-loser": "stock/losers",
        "cryptocurrency": "cryptocurrency",
        "forex": "forex",
        "majors-indexes": "majors-indexes",
        "sectors-performance": "sectors-performance",
    }

    static BATCH_ROUTES = {
        "batch-price": "company/price/$ticker",
    }

    static async getSingleTickerFinanceData(resourceType: string, tickerName: string) {
        const path = this.SINGLE_TICKER_ROUTES[resourceType];
        if (!path) {
            throw new Error("Invalid path");
        }
        const replacedPath = path.replace("$ticker", tickerName);
        return Axios.get(this.ROOT_PATH + replacedPath)
    }
}

