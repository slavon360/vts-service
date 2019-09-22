import React, { Component } from 'react';
import cx from 'classnames';

import styles from './Subcategory.module.scss';

class Subcategory extends Component {
    onSwitchSubcategory = () => {
        const { subcategory: { id }, switchSubcategory, makeProductsRequest, revertCurrentPage } = this.props;
        switchSubcategory(id);
        revertCurrentPage();
        makeProductsRequest();
    }
    render() {
        const { subcategory: { name, checked } } = this.props;
        return (
            <div
                className={cx(styles.Subcategory, { [styles.Checked]: checked })}
                onClick={this.onSwitchSubcategory}
            >
                <div className={styles.Title}>{ name }</div>
            </div>
        );
    }
}

export default Subcategory;