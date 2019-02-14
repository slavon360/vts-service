import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Backdrop } from '../UI';
import Preloader from '../Preloader';
import { toJS } from '../../components/HOC/toJS';
import { toggleSearchedProductsVisibility } from '../../actions/products';

import styles from './Layer.module.scss';

export const LayerContext = React.createContext();

class Layer extends PureComponent {
    state = {
        doNotClose: false,
        isCatalogOpen: false,
        closeCatalog: () => {
            const { showSearchedProducts, toggleSearchedProductsVisibility } = this.props;
            if (showSearchedProducts) toggleSearchedProductsVisibility(false);
            this.setState({ isCatalogOpen: false });
        },
        openCatalog: (event) => {
            event.stopPropagation()
            this.setState((prevState) => ({ isCatalogOpen: !prevState.isCatalogOpen }));
        }
    }

    render () {
        const { closeCatalog } = this.state;
        const { loading } = this.props;
        return (
            <LayerContext.Provider value={this.state}>
                <div
                    className="AppWrapper"
                    onClick={closeCatalog}
                >
                    {this.props.children}
                    {loading ?
                        <div className={styles.Loading}>
                            <Backdrop show clsName={styles.Backdrop} />
                            <Preloader />
                        </div> :
                        <div />
                    }
                </div>
            </LayerContext.Provider>
        );
    }
}

const mapStateToProps = ({
    site: { loading },
    products
}) => ({
    showSearchedProducts: products.get('showSearchedProducts')
})

const mapDispatchToProps = {
    toggleSearchedProductsVisibility
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Layer));