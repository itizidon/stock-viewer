import axios from 'axios';
import type { Dispatch } from '../reducers/types';
import { stockPrice } from '../reducers/stock';

export default function getPrices(quote, days) {
  return async (dispatch: Dispatch) => {
    const { data } = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${quote}&outputsize=full&apikey=${process.env.API_KEY}`
    );
    const arrData = [];
    const dataKeys = Object.keys(data['Time Series (Daily)']);
    for (let lengtOfChart = days; lengtOfChart > 0; lengtOfChart -= 1) {
      const dataPoints = [];
      dataPoints[0] = new Date(dataKeys[lengtOfChart]);
      dataPoints[1] = data['Time Series (Daily)'][dataKeys[lengtOfChart]]['4. close'];
      arrData.push(dataPoints);
    }
    dispatch(stockPrice(arrData));
  };
}
