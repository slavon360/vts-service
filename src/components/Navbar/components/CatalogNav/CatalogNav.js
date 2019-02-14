import React, { Component } from 'react';
import cx from 'classnames';
import CategItem from './CategItem/CategItem';
import AngleDown from '../../../Icons/AngleDown';
import { LayerContext } from '../../../Layer';

import styles from './CatalogNav.module.scss';

class CatalogNav extends Component {
    render() {
        const { catalog, activeIndex, switchCheckedCategory, makeProductsRequest } = this.props;
        return (
                <LayerContext.Consumer>
                    {(context) => (
                            <div className={styles.Categories}>
                                <div
                                    className={styles.CategName}
                                    onClick={context.openCatalog}
                                >
                                    <span className={styles.Text}>
                                        { catalog[activeIndex].categName }
                                    </span>
                                    <span className={cx(styles.AngleIcon, { [styles.Up]: context.isCatalogOpen })}>
                                        <AngleDown style={{ fontSize: '10px', width: '20px' }} />
                                    </span>
                                </div>
                                <div className={cx(styles.CategList, { [styles.Shown]: context.isCatalogOpen })}>
                                    { catalog.map((item, index) => (
                                        <CategItem
                                            key={item._id}
                                            item={item}
                                            index={index}
                                            switchCheckedCategory={switchCheckedCategory}
                                            makeProductsRequest={makeProductsRequest}
                                            closeCatalog={context.closeCatalog}
                                        />
                                    ))}
                                </div>
                            </div>
                            )
                    }
                </LayerContext.Consumer>
        );
    }
}

export default CatalogNav;