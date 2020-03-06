import axios from 'axios';
import type { Dispatch } from '../reducers/types';
import { stockPrice, bollingerBands } from '../reducers/stock';

// export function bollingerBandsCalc(data) {
//   let simpleMovingAverage = [];
//   // for(let x = 0; )
// }

export default function getPrices(quote, days) {
  return async (dispatch: Dispatch) => {
    const { data } = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${quote}&outputsize=full&apikey=${process.env.API_KEY}`
    );
    const arrData = [];
    const dataKeys = Object.keys(data['Time Series (Daily)']);
    for (
      let lengtOfChart = Number(days) + 19;
      lengtOfChart >= 0;
      lengtOfChart -= 1
    ) {
      const dataPoints = [
        new Date(`${dataKeys[lengtOfChart]} 00:00`),
        data['Time Series (Daily)'][dataKeys[lengtOfChart]]['4. close']
      ];
      arrData.push(dataPoints);
    }
    dispatch(stockPrice(arrData.slice(20, days + 19)));
    dispatch(bollingerBands(arrData));
  };
}
