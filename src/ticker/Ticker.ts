import financialModelingPrepAPI from "../integrations/financialModelingPrepAPI";

export default class Ticker {
    name:string
    data: {[s:string]: any}
    constructor(tickerName: string, data: {[s:string]: any}){
        this.name = tickerName;
        this.data = Object.keys(data).map((key: string) => data[key]);
    }


}