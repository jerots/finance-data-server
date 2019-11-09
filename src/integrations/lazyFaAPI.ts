import Axios from "axios";
import _ from "lodash";

export default class lazyFaAPI {
  private static tickerList = null;

  static async getTickerList() {
    if (this.tickerList) return this.tickerList;

    const tickerListResult = await Axios.get(
      "https://s3.amazonaws.com/lfatickerlists/sf1-tickers.json"
    );
    const tickerList = _.get(tickerListResult, "data");

    this.tickerList = tickerList;

    return tickerList;
  }
}
