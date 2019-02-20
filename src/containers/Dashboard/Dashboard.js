import { connect } from 'react-redux';
import { toJS } from '../../components/HOC/toJS';
import { Dashboard } from '../../components';
// import {  } from '../../actions/user';

const mapStateToProps = ({ user }) => ({
    userData: user.get('userData')
});

export default connect(mapStateToProps, {})(toJS(Dashboard));