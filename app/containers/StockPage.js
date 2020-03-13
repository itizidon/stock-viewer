import { connect } from 'react-redux';
import Stock from '../components/Stock';
import getPrices, {
  bollingerBandsCalc,
  bollingerBandsWidthCalc
} from '../actions/stock';

const mapStateToProps = state => ({
  price: state.stock,
  bollingerBandsData: state.bollingerBandsData,
  bbw: state.bollingerBandWidthChart
});

function mapDispatchToProps(dispatch) {
  return {
    gotPrices: (quote, days) => dispatch(getPrices(quote, days)),
    bollingerBandsCalc: data => dispatch(bollingerBandsCalc(data)),
    bollingerBandsWidthCalc: data => dispatch(bollingerBandsWidthCalc(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
