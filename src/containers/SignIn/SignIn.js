import { connect } from 'react-redux';
import { toJS } from '../../components/HOC/toJS';
import { SignIn, Registration } from '../../components';
import { signInNewUser } from '../../actions/user';

const mapStateToProps = ({
    user
}) => {
    return {
        userData: user.get('userData')
    }
};

const mapDispatchToProps = {
    signInNewUser
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Registration));