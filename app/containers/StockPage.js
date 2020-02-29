import { connect } from 'react-redux';
import Stock from '../components/Stock';
import getPrices from '../actions/stock';

const mapStateToProps = state => ({
  state
});

function mapDispatchToProps(dispatch) {
  return {
    gotPrices: quote => dispatch(getPrices(quote))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Stock);
