import financialModelingPrepAPI from "../integrations/financialModelingPrepAPI";
import Ticker from "./Ticker";
import Axios from "axios";
import * as _ from "lodash";
import lazyFaAPI from "../integrations/lazyFaApi";

export default class TickerController {
  private static cache: { [s: string]: Ticker } = {};
  private static tickerList: { [Exchange: string]: string }[] = [];

  public static async get(tickerName: string) {
    // let ticker = this.cache[tickerName];
    // if (!ticker){
    // ticker = await this.initTicker(tickerName);
    // this.cache[tickerName] = ticker;
    // }
    const ticker = await this.initTicker(tickerName);
    return ticker;
  }

  public static async getList() {
    return lazyFaAPI.getTickerList();
  }

  private static async initTicker(tickerName: string): Promise<Ticker> {
    const tickerData = await financialModelingPrepAPI.getAllTickerFinanceData(
      tickerName
    );
    return new Ticker(tickerName, tickerData);
  }
}
