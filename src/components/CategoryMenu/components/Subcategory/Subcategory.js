import React, { Component } from 'react';
import cx from 'classnames';

import styles from './Subcategory.module.scss';

class Subcategory extends Component {
    onSwitchSubcategory = () => {
        const {
            subcategory: { id },
            switchSubcategory,
            makeProductsRequest,
            revertCurrentPage
        } = this.props;
        switchSubcategory(id);
        revertCurrentPage();
        makeProductsRequest();
    }
    render() {
        const { subcategory: { name, checked, image_url, width, height } } = this.props;
        return (
            <div
                className={cx(styles.Subcategory, {
                    [styles.Checked]: checked,
                    [styles.SubcategoryWithImage]: image_url
                })}
                onClick={this.onSwitchSubcategory}
            >
                {image_url ?
                    <div className={styles.SubcategImageContainer}>
                        <img src={image_url} alt={name} width={width} height={height} />
                    </div>
                    :
                    <div className={styles.Title}>{ name }</div>
                }
            </div>
        );
    }
}

export default Subcategory;