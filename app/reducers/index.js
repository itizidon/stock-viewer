// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import type { HashHistory } from 'history';
import counter from './counter';
import stock, { bollingerBandsOn, bollingerBandWidthChart } from './stock';

export default function createRootReducer(history: HashHistory) {
  return combineReducers<{}, *>({
    router: connectRouter(history),
    counter,
    stock,
    bollingerBandsData: bollingerBandsOn,
    bollingerBandWidthChart
  });
}
