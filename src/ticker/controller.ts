import Axios from "axios";
import { Ticker } from "./model";
import financialModelingPrepAPI from "../integrations/financialModelingPrepAPI";

export default class TickerController {

    static async getFinanceData(resourceType: string, tickerName: string):Promise<JSON> {
        const result = await financialModelingPrepAPI.getSingleTickerFinanceData(resourceType, tickerName);

        
        return result.data;
    }
}

