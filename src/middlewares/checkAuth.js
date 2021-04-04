import _get from 'lodash/get';
import localStorage from '../utils/localStorage';
import { USER_TYPES } from '../actions/user';

function checkAuth() {
    return next => action => {
        const isPersist = _get(action, 'type', '').indexOf('persist') >= 0;
        
        if (!isPersist &&
            localStorage.isAuthenticated &&
            !action.isChecked &&
            typeof action !== 'function') {
            const userInfo = localStorage.getUserInfo();
            const updatedAction = (dispatch) => {
                dispatch({
                    type: USER_TYPES.syncUserData,
                    userInfo,
                    isChecked: true
                });
                dispatch({
                    ...action,
                    isChecked: true
                  });
            }
            return next(updatedAction);
        }
        
        return next(action);
    }
}

export default checkAuth;