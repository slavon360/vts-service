import React, { PureComponent } from 'react';
import cx from 'classnames';

import styles from './CategItem.module.scss';

class CategItem extends PureComponent {
    makeCheckedCategory = () => {
        const { item: { _id }, switchCheckedCategory, index, makeProductsRequest, closeCatalog } = this.props;
        switchCheckedCategory(_id, index);
        makeProductsRequest();
        closeCatalog();
    }
    render() {
        const { item: { categName, checked } } = this.props;
        return (
            <div
                className={cx(styles.Name, { [styles.Active]: checked })}
                onClick={this.makeCheckedCategory}
            >{categName}</div>
        );
    }
}

export default CategItem;