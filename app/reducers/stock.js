import type { Action } from './types';
// action type
export const STOCKPRICE = 'STOCKPRICE';
export const BOLLINGERBANDS = 'BOLLINGERBANDS';
export const BOLLINGERBANDSANDPRICE = 'BOLLINGERBANDSANDPRICE';

// action creator
export const stockPrice = (prices: string) => ({
  type: STOCKPRICE,
  prices
});

export const bollingerBands = bands => ({
  type: BOLLINGERBANDS,
  bands
});
// reducer

export const bollingerBandsOn = (defaultBands: Array = [], action: Action) => {
  switch (action.type) {
    case BOLLINGERBANDS:
      return action.bands;
    default:
      return defaultBands;
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
