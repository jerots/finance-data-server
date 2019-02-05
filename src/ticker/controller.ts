import financialModelingPrepAPI from "../integrations/financialModelingPrepAPI";
import Ticker from "./Ticker";

export default class TickerController {

    private static cache: {[s:string]: Ticker} = {};

    public static async get(tickerName: string) {
        let ticker = this.cache[tickerName];
        // if (!ticker){
            ticker = await this.init(tickerName);
            // this.cache[tickerName] = ticker;
        // }
        return ticker;
    }

    private static async init(tickerName: string): Promise<Ticker>{


        const data = await financialModelingPrepAPI.getAllTickerFinanceData(tickerName)

        return new Ticker(tickerName, data);
    }



}