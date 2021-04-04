import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Backdrop } from '../UI';
import { Notifier, Preloader } from '../';
// import Preloader from '../Preloader';
import { toJS } from '../../components/HOC/toJS';
import { toggleSearchedProductsVisibility } from '../../actions/products';
import { setInitialCartInfo } from '../../actions/cart';
import { setModalState, setWindowWidth, setServerErrorMessage } from '../../actions/site';

import styles from './Layer.module.scss';

export const LayerContext = React.createContext();

Modal.setAppElement('#root');

class Layer extends PureComponent {
	state = {
		doNotClose: false,
		isCatalogOpen: false,
		serverErrorMessage: null,
		showNotifier: false,
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
	static getDerivedStateFromProps(nextProps, prevState) {
		if (nextProps.serverErrorMessage !== prevState.serverErrorMessage) {
			return {
				serverErrorMessage: nextProps.serverErrorMessage,
				showNotifier: !!nextProps.serverErrorMessage
			}
		}
		return null;
	}
	componentDidMount() {
		const windowWidth = window.innerWidth;
		
		this.props.setWindowWidth(windowWidth);
		this.props.setInitialCartInfo();
	}
	closeModal = () => {
		const isOpen = false;
		this.props.setModalState(isOpen);
	}
	hideNotifier = () => {
		this.setState({showNotifier: false, serverErrorMessage: null},
			() => this.props.setServerErrorMessage(null));
	}

	render () {
		const { closeCatalog, showNotifier } = this.state;
		const { loading, serverErrorMessage } = this.props;
		
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
					{showNotifier &&
						<Notifier onHide={this.hideNotifier} errorMessage={serverErrorMessage} />
					}
				</div>
			</LayerContext.Provider>
		);
	}
}

const mapStateToProps = ({
	site: {
		loading,
		modalIsOpen,
		modalTemplate,
		serverErrorMessage
	},
	products
}) => ({
	loading,
	modalIsOpen,
	modalTemplate,
	serverErrorMessage,
	showSearchedProducts: products.get('showSearchedProducts')
})

const mapDispatchToProps = {
	toggleSearchedProductsVisibility,
	setModalState,
	setInitialCartInfo,
	setWindowWidth,
	setServerErrorMessage
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Layer));