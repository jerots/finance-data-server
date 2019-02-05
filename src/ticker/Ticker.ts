import financialModelingPrepAPI from "../integrations/financialModelingPrepAPI";

export default class Ticker {
    name: string
    incomeStatement: any
    balanceSheet: any
    dcf: number
    rating: number
    cashFlowStatement: any
    profile: any


    constructor(tickerName: string, { incomeStatement, balanceSheet, dcf, rating, cashFlowStatement, profile }: TickerData) {
        if (!incomeStatement || !balanceSheet || !dcf || !rating || !cashFlowStatement || !profile){
            throw new Error("Missing TickerData parameters");
        }
        this.name = tickerName;
        this.incomeStatement = incomeStatement;
        this.balanceSheet = balanceSheet;
        this.dcf = dcf.DCF;
        this.rating = rating.rating;
        this.cashFlowStatement = cashFlowStatement;
        this.profile = profile;
    }


}

export interface TickerData { [incomeStatement: string]: any, balanceSheet?: any, dcf?: any, rating?: any, cashFlowStatement?: any, profile?: any }