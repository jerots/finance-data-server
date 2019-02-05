import financialModelingPrepAPI from "../integrations/financialModelingPrepAPI";
import Ticker from "./Ticker";

export default class TickerController {

    private static cache: {[s:string]: Ticker} = {};

    public static async get(tickerName: string) {
        // let ticker = this.cache[tickerName];
        // if (!ticker){
            // ticker = await this.initTicker(tickerName);
            // this.cache[tickerName] = ticker;
        // }
        const ticker = await this.initTicker(tickerName);
        return ticker;
    }

    private static async initTicker(tickerName: string): Promise<Ticker>{


        const tickerData = await financialModelingPrepAPI.getAllTickerFinanceData(tickerName)

        return new Ticker(tickerName, tickerData);
    }



}