import type { Action } from './types';
// action type
export const STOCKPRICE = 'STOCKPRICE';
export const BOLLINGERBANDS = 'BOLLINGERBANDS';
export const BOLLINGERBANDSANDPRICE = 'BOLLINGERBANDSANDPRICE';
const BOLLINGERBANDSWIDTH = 'BOLLINGERBANDSWIDTH';
const BOLLINGERBANDSWIDTHCHART = 'BOLLINGERBANDSWIDTHCHART';

// action creator
export const stockPrice = (prices: array) => ({
  type: STOCKPRICE,
  prices
});

export const bollingerBands = bands => ({
  type: BOLLINGERBANDS,
  bands
});

export const bollingerBandsWidth = bandWidth => ({
  type: BOLLINGERBANDSWIDTH,
  bandWidth
});

export const bollingerBandWidthChartData = chartData => ({
  type: BOLLINGERBANDSWIDTHCHART,
  chartData
});
// reducer

export const bollingerBandsWidthStore = (
  defaultwidth: object = { upperBand: [], lowerBand: [], dataWithBands: [] },
  action: Action
) => {
  switch (action.type) {
    case BOLLINGERBANDSWIDTH:
      return action.bandWidth;
    default:
      return defaultwidth;
  }
};

export const bollingerBandsOn = (
  defaultBands: object = { arrData: [], days: 0 },
  action: Action
) => {
  switch (action.type) {
    case BOLLINGERBANDS:
      return action.bands;
    default:
      return defaultBands;
  }
};

export const bollingerBandWidthChart = (
  defaultbbwChart: array = [],
  action: Action
) => {
  switch (action.type) {
    case BOLLINGERBANDSWIDTHCHART:
      return action.chartData;
    default:
      return defaultbbwChart;
  }
};

export default function currentStock(defaultPrice: Array = [], action: Action) {
  switch (action.type) {
    case BOLLINGERBANDSANDPRICE:
      return action.prices;
    case STOCKPRICE:
      return action.prices;
    default:
      return defaultPrice;
  }
}
