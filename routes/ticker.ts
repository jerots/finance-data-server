import express from "express"

const router = express.Router();

import TickerController from "../src/ticker/controller"

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send("No ticker information");
});
router.get('/:ticker', async (req, res, next) => {
  const ticker = req.params.ticker;
  if (ticker) {
    const data = await TickerController.getFinanceData(ticker);
    res.send(data);
  } else {
    res.send("No ticker information");
  }
});

export default router;
