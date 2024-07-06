import axios from "axios";

const financeLayerUrl = "https://api.apilayer.com/financelayer/news";

export const getFinanceNews = async () => {
  try {
    const response = await axios({
      method: "GET",
      url: financeLayerUrl,
      params: {
        tickers: "tickers",
        tags: "tags",
        sources: "sources",
        sort: "desc",
        offset: "offset",
        limit: "limit",
        keywords: "keywords",
        fallback: "on",
        date: "thisweek",
      },
      headers: {
        apikey: "cEblqk7z3VW1Zg1DSE6leOiJDdp2LH6F",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Cannot fetch finance news data");
  }
};
