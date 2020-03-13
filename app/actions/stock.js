import axios from 'axios';
import { std } from 'mathjs';
import type { Dispatch } from '../reducers/types';
import {
  stockPrice,
  bollingerBands,
  bollingerBandsWidth,
  bollingerBandWidthChartData
} from '../reducers/stock';

export function bollingerBandsWidthCalc(data) {
  const bbw = [];
  for (let x = 0; x < data.upperBand.length; x += 1) {
    bbw.push([
      data.dataWithBands[x][0],
      (data.upperBand[x][1] - data.lowerBand[x][1]) / data.dataWithBands[x][1]
    ]);
  }
  return bbw;
}

export function bollingerBandsCalc(data) {
  return async (dispatch: Dispatch) => {
    const days = Number(data.days);
    const dataWithBands = [];
    const upperBand = [];
    const lowerBand = [];
    for (let x = 20; x < days + 20; x += 1) {
      let sum = 0;
      const last20prices = [];
      for (let y = 19; y >= 0; y -= 1) {
        sum += Number(data.arrData[x - y][1]);
        last20prices.push(data.arrData[x - y][1]);
      }
      const standardDeviation = std(last20prices, 'uncorrected');
      upperBand.push([data.arrData[x][0], sum / 20 + standardDeviation * 2]);
      lowerBand.push([data.arrData[x][0], sum / 20 - standardDeviation * 2]);
      dataWithBands.push([data.arrData[x][0], sum / 20]);
    }
    const bands = bollingerBandsWidthCalc({
      upperBand,
      lowerBand,
      dataWithBands
    });
    dispatch(
      stockPrice([
        { label: 'Series 1', data: data.arrData.slice(20, days + 20) },
        {
          label: 'Simple Moving Average',
          data: dataWithBands
        },
        {
          label: 'Upper Band',
          data: upperBand
        },
        { label: 'Lower Band', data: lowerBand }
      ])
    );
    dispatch(bollingerBandsWidth({ upperBand, lowerBand, dataWithBands }));
    dispatch(
      bollingerBandWidthChartData([
        { label: 'Bollinger Band Width', data: bands }
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
