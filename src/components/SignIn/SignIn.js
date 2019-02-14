import React, { Component } from 'react';

import styles from './SignIn.module.scss';

const renderFields = (field, changeVal) => {
    const key = field[0];
    const { placeholder, value } = field[1];
    switch (key) {
        case 'email':
            return (
                <div key={placeholder} className={styles.Field}>
                    <input
                        placeholder={placeholder}
                        name={key}
                        type="email"
                        onChange={(e) => changeVal(e, key)}
                        value={value}
                    />
                </div>
            )
        case 'password':
            return (
                <div key={placeholder} className={styles.Field}>
                    <input
                        placeholder={placeholder}
                        name={key}
                        type="password"
                        onChange={(e) => changeVal(e, key)}
                        value={value}
                    />
                </div>
            )
        default:
            return (
                <div key={placeholder} className={styles.Field}>
                    <input
                        placeholder={placeholder}
                        name={key}
                        type="text"
                        onChange={(e) => changeVal(e, key)}
                        value={value}
                    />
                </div>
            )
    }
}

class SignIn extends Component {
    state = {
        user: {
            firstName: {
                placeholder: 'First name',
                value: ''
            },
            lastName: {
                placeholder: 'Last name',
                value: ''
            },
            city: {
                placeholder: 'City',
                value: ''
            },
            phone: {
                placeholder: 'Phone',
                value: ''
            },
            email: {
                placeholder: 'Email',
                value: ''
            },
            password: {
                placeholder: 'Password',
                value: ''
            },
        }
    }
    onChangeValue = (e, key) => {
        const { value } = e.target;
        const updState = {
            ...this.state,
            user: {
                ...this.state.user,
                [key]: {
                    ...this.state.user[key],
                    value
                }
            }
        };
        this.setState(updState);
    }
    onRegisterUser = (e) => {
        e.preventDefault();
        const { user } = this.state;
        const updUser = Object.entries(user).reduce((result, current) => {
            result = {
                ...result,
                [current[0]]:current[1].value
            }
            return result;
        }, {});
        this.props.signInNewUser(updUser);
    }
    render() {
        const { user } = this.state;
        return (
            <form
                className={styles.SignIn}
                onSubmit={this.onRegisterUser}
            >
                {
                    Object.entries(user).map(field => renderFields(field, this.onChangeValue))
                }
                <button type="submit" className={styles.Register}>Register</button>
            </form>
        );
    }
}

export default SignIn;