import express from "express"

const router = express.Router();

import TickerController from "../src/ticker/controller"

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send("No ticker information");
});
router.get('/:ticker/:resourceType', async (req, res, next) => {
  const ticker = req.params.ticker;
  const resourceType = req.params.resourceType;
  if (!ticker){
    res.send("No ticker information");
  }
  if (!resourceType){
    res.send("No resourceType information");
  }

    const data = await TickerController.getFinanceData(resourceType, ticker);
    res.send(data);
});

export default router;
