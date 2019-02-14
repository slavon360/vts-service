import { connect } from 'react-redux';
import { toJS } from '../../components/HOC/toJS';
import { Login } from '../../components';
import { login } from '../../actions/user';

const mapStateToProps = ({
    user
}) => {
    return {
        userData: user.get('userData')
    }
};

const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Login));