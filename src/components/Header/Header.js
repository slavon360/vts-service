import React, { PureComponent, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Search from '../Search';
import CartButton from '../CartButton';
import Navbar from '../Navbar';
// import UserNavbar from '../UserNavbar';
import HomeIcon from '../Icons/HomeIcon';

import styles from './Header.module.scss';
import { routes } from '../../routes';

class Header extends PureComponent {
	static propTypes = {
		user: PropTypes.object,
		catalog: PropTypes.array
	};
	static defaultProps = {
		catalog: []
	}
	state = {
		// switched to 'true' and removed click handler
		searchActive: true,
		searchedText: '',
		prevScrollpos: window.pageYOffset,
		visible: true
	}

	componentDidMount() {
		this.fetchCurrencyRateAndCatalog();
		this.fetchContacts();
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	handleScroll = (event) => {
		const { prevScrollpos } = this.state;

		const currentScrollPos = window.pageYOffset;
		const visible = prevScrollpos > currentScrollPos;

		this.setState({
			prevScrollpos: currentScrollPos,
			visible
		});
	}

	fetchCurrencyRateAndCatalog = async () => {
		const {
			getCatalogMenu,
			getCurrencyRate,
			currencyRate,
			setLoadingState,
			makeProductsRequest
			// getFilters
		} = this.props;
		setLoadingState(true);
		if (!currencyRate) await getCurrencyRate();

		await getCatalogMenu();

		if (window.location.pathname !== routes.REPAIR) {
			makeProductsRequest();
			// getFilters();
		} else {
			setLoadingState(false);
		}
	}

	fetchContacts = async () => {
		await this.props.getContacts();
	}

	onSearchProducts = (e) => {
		const { showSearchedProducts, toggleSearchedProductsVisibility } = this.props;
		const { value } = e.target;
		this.setState({ searchedText: value }, async () => {
			this.props.searchProductsLoading(true);
			if (!showSearchedProducts) toggleSearchedProductsVisibility(true);
			if (value.length > 1) await this.props.searchProducts(value);
			if (!value) this.props.clearSearchedProducts();
			this.props.searchProductsLoading(false);
		});
	}

	onToggleSearch = () => this.setState((prevState) => ({ searchActive: !prevState.searchActive }));

	render() {
		const { searchActive, searchedText, visible } = this.state;
		const {
			productsQty,
			catalog,
			activeIndex,
			switchCheckedCategory,
			makeProductsRequest,
			searchedProducts,
			searchedProductsLoading,
			showSearchedProducts,
			loading,
			contacts
		} = this.props;
		return (
			<div className={cx(styles.Header, {
				[styles.Visible]: visible,
				[styles.Hidden]: !visible
			})}
			>
				{!loading && catalog.length ?
					<Fragment>
						<div className={styles.LeftSide}>
							<Link className={styles.HomeLink} to="/">
								<span className={styles.HomeLinkText}>Вода Тепло Сервис</span>
								<HomeIcon className={styles.HomeIcon} style={{ fontSize: '25px' }} />
							</Link>
							<Search
								contacts={contacts}
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
								contacts={contacts}
							/>
							{/* <div className={styles.PhonesWrp}>
								{
									contacts.slice(0, 4).map(({ телефон, image: { secure_url } = {} }, index) => (
										<a
											key={телефон + index}
											className={styles.Phone}
											href={`tel:${телефон}`}
										>
											{телефон}
											{secure_url && телефон === '068 40 20 821' &&
												<img className={styles.PhoneImg} src={secure_url} alt="phone number" />
											}
										</a>
									))
								}
								<div className={styles.Email}>
									<a href="mailto:vts.07@ukr.net">vts.07@ukr.net</a>
									<span className={styles.City}>г. Днепр</span>
								</div>
							</div> */}
						</div>
						<div className={styles.RightSide}>
							{/* <UserNavbar logout={logout} userData={userData} /> */}
							<CartButton productsQty={productsQty} />
						</div>
					</Fragment> : <div />
				}
			</div>
		);
	}
}

export default Header;