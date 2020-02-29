import { connect } from 'react-redux';
import Stock from '../components/Stock';
import getPrices from '../actions/stock';

const mapStateToProps = state => ({
  price: state.stock
});

function mapDispatchToProps(dispatch) {
  return {
    gotPrices: quote => dispatch(getPrices(quote))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
