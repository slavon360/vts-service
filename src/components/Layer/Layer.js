import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { Backdrop, Button } from '../UI';
import Preloader from '../Preloader';
import { toJS } from '../../components/HOC/toJS';
import { toggleSearchedProductsVisibility } from '../../actions/products';
import { setModalState } from '../../actions/site';

import styles from './Layer.module.scss';

export const LayerContext = React.createContext();

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };

Modal.setAppElement('#root');

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
    closeModal = () => {
        const isOpen = false;
        this.props.setModalState(isOpen);
    }

    render () {
        const { closeCatalog } = this.state;
        const { loading, modalIsOpen, modalTemplate } = this.props;
        console.log(modalIsOpen, loading)
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
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Example Modal"
                        >
                        <div dangerouslySetInnerHTML={{ __html: modalTemplate }}></div>
                        <Button clickHandler={this.closeModal}>Ok</Button>
                    </Modal>
                </div>
            </LayerContext.Provider>
        );
    }
}

const mapStateToProps = ({
    site: { loading, modalIsOpen, modalTemplate },
    products
}) => ({
    loading,
    modalIsOpen,
    modalTemplate,
    showSearchedProducts: products.get('showSearchedProducts')
})

const mapDispatchToProps = {
    toggleSearchedProductsVisibility,
    setModalState
}

export default connect(mapStateToProps, mapDispatchToProps)(toJS(Layer));