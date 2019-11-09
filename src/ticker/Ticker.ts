import financialModelingPrepAPI from "../integrations/financialModelingPrepAPI";

export default class Ticker {
  name: string;
  incomeStatement: any;
  balanceSheetStatement: any;
  cashFlowStatement: any;
  profile: any;

  constructor(
    tickerName: string,
    {
      incomeStatement,
      balanceSheetStatement,
      cashFlowStatement,
      profile
    }: TickerData
  ) {
    if (
      !incomeStatement ||
      !balanceSheetStatement ||
      !cashFlowStatement ||
      !profile
    ) {
      throw new Error("Missing TickerData parameters");
    }
    this.name = tickerName;
    this.incomeStatement = incomeStatement;
    this.balanceSheetStatement = balanceSheetStatement;
    this.cashFlowStatement = cashFlowStatement;
    this.profile = profile;
  }
}

export interface TickerData {
  [incomeStatement: string]: any;
  balanceSheet?: any;
  dcf?: any;
  rating?: any;
  cashFlowStatement?: any;
  profile?: any;
}
