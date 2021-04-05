import React, { Component } from 'react';
import localStorage from '../../utils/localStorage';

const RequireAuth = (WrappedComponent) => { 

    return class RequireAuth extends Component { 

        UNSAFE_componentWillMount() { 
            const userData = localStorage.getUserInfo(); 
            if(!userData) { 
               this.props.history.replace({pathname: '/'}); 
            }
        } 
        render() { 
           return <WrappedComponent {...this.props} /> 
        }
    } 
} 

export default RequireAuth;