import type { Action } from './types';
// action type
export const STOCKPRICE = 'STOCKPRICE';

// action creator
export const stockPrice = (prices: string) => ({
  type: STOCKPRICE,
  prices
});

// reducer
export default function currentStock(
  defaultPrice: string = [],
  action: Action
) {
  switch (action.type) {
    case STOCKPRICE:
      return action.prices;
    default:
      return defaultPrice;
  }
}
