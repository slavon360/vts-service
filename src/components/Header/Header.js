import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Search from '../Search';
import CartButton from '../CartButton';
import Navbar from '../Navbar';
import UserNavbar from '../UserNavbar';
import HomeIcon from '../Icons/HomeIcon';

import styles from './Header.module.scss';

class Header extends PureComponent {
    static propTypes = {
        user: PropTypes.object,
        catalog: PropTypes.array
    };
    static defaultProps = {
        catalog: []
    }
    state = {
        searchActive: false,
        searchedText: ''
    }

    componentDidMount() {
        this.fetchCurrencyRateAndCatalog();
    }

    fetchCurrencyRateAndCatalog = async () => {
        const {
            getCatalogMenu,
            getCurrencyRate,
            currencyRate,
            setLoadingState,
            // getFilters
        } = this.props;
        setLoadingState(true);
        if (!currencyRate) await getCurrencyRate();
        await getCatalogMenu();
        // getFilters();
    }

    onSearchProducts = (e) => {
        const { showSearchedProducts, toggleSearchedProductsVisibility } = this.props;
        const { value } = e.target;
        this.setState({ searchedText: value }, async () => {
            this.props.searchProductsLoading(true);
            if (!showSearchedProducts) toggleSearchedProductsVisibility(true);
            if (value) await this.props.searchProducts(value);
            if (!value) this.props.clearSearchedProducts();
            this.props.searchProductsLoading(false);
        });
    }

    onToggleSearch = () => this.setState((prevState) => ({ searchActive: !prevState.searchActive }));

    render() {
        const { searchActive, searchedText } = this.state;
        const {
            productsQty,
            catalog,
            activeIndex,
            switchCheckedCategory,
            makeProductsRequest,
            searchedProducts,
            searchedProductsLoading,
            showSearchedProducts,
            userData,
            loading,
            logout
        } = this.props;
        return (
            <div className={styles.Header}>
                {!loading && catalog.length ?
                    <Fragment>
                        <div className={styles.LeftSide}>
                            <Link className={styles.HomeLink} to="/">
                                <HomeIcon style={{ fontSize: '25px' }} />
                            </Link>
                            <Search
                                showSearchedProducts={showSearchedProducts}
                                toggleSearch={this.onToggleSearch}
                                searchActive={searchActive}
                                searchProducts={this.onSearchProducts}
                                searchedText={searchedText}
                                searchedProducts={searchedProducts}
                                searchedProductsLoading={searchedProductsLoading}
                            />
                            <Navbar
                                catalog={catalog}
                                activeIndex={activeIndex}
                                switchCheckedCategory={switchCheckedCategory}
                                makeProductsRequest={makeProductsRequest}
                            />
                        </div>
                        <div className={styles.RightSide}>
                            <UserNavbar logout={logout} userData={userData} />
                            <CartButton productsQty={productsQty} />
                        </div>
                    </Fragment> : <div />
                }
            </div>
        );
    }
}

export default Header;