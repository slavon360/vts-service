import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { routes as routeNames } from '../../../../routes';

import styles from './Result.module.scss';

class Result extends PureComponent {
    static propTypes = {
        link: PropTypes.string
    }
    render() {
        const { link, title } = this.props;
        return (
            <Link className={styles.Result} to={routeNames.PRODUCT_DETAILS + '/' + link}>
                {title}
            </Link>
        );
    }
}

export default Result;