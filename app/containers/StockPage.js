import { connect } from 'react-redux';
import Stock from '../components/Stock';

const mapStateToProps = state => ({
  state
});

export default connect(mapStateToProps)(Stock);
