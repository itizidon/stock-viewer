// action type
const STOCKPRICE = 'STOCKPRICE';

// action creator
export const stockPrice = prices => ({
  STOCKPRICE,
  prices
});

// reducer
export default function currentStock(defaultPrice = '', action) {
  switch (action.type) {
    case STOCKPRICE:
      return action.prices;
    default:
      return defaultPrice;
  }
}
