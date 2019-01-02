import Axios from "axios";
import { Ticker } from "./model";

export default class TickerController {

    static async getFinanceData(tickerName: String):Promise<Ticker> {
        const balanceSheet = await Axios.get(`https://financialmodelingprep.com/api/financials/balance-sheet-statement/${tickerName}`);
        const incomeStatement = await Axios.get(`https://financialmodelingprep.com/api/financials/income-statement/${tickerName}`);
        const cashFlowStatement = await Axios.get(`https://financialmodelingprep.com/api/financials/cash-flow-statement/${tickerName}`);

        
        return new Ticker(tickerName);
    }
}

