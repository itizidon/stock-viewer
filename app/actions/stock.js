import axios from 'axios';
import type { Dispatch } from '../reducers/types';
import { stockPrice, bollingerBands } from '../reducers/stock';

export function bollingerBandsCalc(data) {
  return async (dispatch: Dispatch) => {
    const days = Number(data.days);
    const dataWithBands = [];
    console.log(data, 'THIS IS DATA');
    for (let x = 20; x < days + 20; x += 1) {
      let sum = 0;
      for (let y = 19; y >= 0; y -= 1) {
        sum += Number(data.arrData[x - y][1]);
      }
      console.log(sum);
      dataWithBands.push([data.arrData[x][0], sum / 20]);
    }
    console.log(dataWithBands);
    dispatch(
      stockPrice([
        { label: 'Series 1', data: data.arrData.slice(20, days + 20) },{
          label: 'Simple Moving Average',
          data: dataWithBands
        }
      ])
    );
  };
}

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
    dispatch(
      stockPrice([{ label: 'Series 1', data: arrData.slice(20, days + 19) }])
    );

    dispatch(bollingerBands({ arrData, days }));
  };
}
