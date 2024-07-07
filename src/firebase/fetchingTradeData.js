import { getTrades } from "../firebase/firebaseOperations";

export const StrategyCompareData = async () => {
  try {
    const trades = await getTrades();
    if (!trades.length) {
      return [];
    }

    const sortedTrades = trades.sort(
      (a, b) => new Date(a.entryDate) - new Date(b.entryDate)
    );

    const strategyData = {};

    sortedTrades.forEach((trade) => {
      const strategy = trade.strategy;
      const entryDate = trade.entryDate;
      const result = trade.result;
      const tradeStatus = trade.TradeStatus;
      console.log(tradeStatus);
      if (tradeStatus === "Closed P" || tradeStatus === "Closed L") {
        if (!strategyData[strategy]) {
          strategyData[strategy] = [];
        }

        const lastEntry = strategyData[strategy].length
          ? strategyData[strategy][strategyData[strategy].length - 1]
          : { accumulatedResult: 0 };
        const accumulatedResult = lastEntry.accumulatedResult + result;

        strategyData[strategy].push({
          ...trade,
          accumulatedResult,
        });
      }
    });

    const processedData = Object.keys(strategyData).map((strategy) => ({
      strategy,
      data: strategyData[strategy],
    }));

    return processedData;
  } catch (error) {
    console.error("Error processing trades data:", error);
    return [];
  }
};
