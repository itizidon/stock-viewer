import { connect } from 'react-redux';
import Stock from '../components/Stock';
import getPrices, { bollingerBandsCalc } from '../actions/stock';

const mapStateToProps = state => ({
  price: state.stock,
  bollingerBandsData: state.bollingerBandsData
});

function mapDispatchToProps(dispatch) {
  return {
    gotPrices: (quote, days) => dispatch(getPrices(quote, days)),
    bollingerBandsCalc: data => dispatch(bollingerBandsCalc(data))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
