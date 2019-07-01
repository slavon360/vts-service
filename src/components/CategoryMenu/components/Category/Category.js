import React, { Component } from 'react';
import cx from 'classnames';
import * as paths from '../../../../constants/paths';

import zapchastiVodonagrevateli from '../../../../assets/images/catalog/boilery/zapchasti-k-vodonagrevatelyam.jpg';
import zapchastiKolonki from '../../../../assets/images/catalog/kolonki/zapchasti_kolonki.jpg';
import zapchastiElektrKotly from '../../../../assets/images/catalog/kotly/zapchasti-k-elektricheskim.jpg';
import zapchastiGazKotlyImg from '../../../../assets/images/catalog/kotly/zapchasti-k-gazovym.jpg';
import kotlyImg from '../../../../assets/images/catalog/kotly/kotly.jpg';
import boileryImg from '../../../../assets/images/catalog/boilery/boilery.jpg';
// import zapchastiImg from '../../../../assets/images/catalog/zapchasti/zapchasti.jpg';

import styles from './Category.module.scss';

const imgImporter = (name) => {
    const path = paths.imgCategoriesPath;
    switch (name) {
        case 'kotly':
            return kotlyImg;
        case 'boilery':
            return boileryImg;
        case 'zapchasti':
            return kotlyImg;
        case 'zapchasti-gazovye-kotly':
            return zapchastiGazKotlyImg;
        case 'zapchasti-elektro-kotly':
            return zapchastiElektrKotly;
        case 'zapchasti-gazovye-kolonki':
            return zapchastiKolonki;
        case 'zapchasti-elektro-vodonagrevateli':
            return zapchastiVodonagrevateli;
        default: return kotlyImg;
    }
}

class Category extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.category.checked !== this.props.category.checked;
    }
    makeCheckedCategory = () => {
        const { category: { _id }, switchCheckedCategory, index, makeProductsRequest } = this.props;
        switchCheckedCategory(_id, index);
        makeProductsRequest();
    }
    render() {
        const { category: { categSlug, categName, checked } } = this.props;
        return (
            <div
                onClick={this.makeCheckedCategory}
                className={cx(styles.Category, { [styles.Checked]: checked })}>
                <div
                    className={styles.CategoryImg}
                    style={{ backgroundImage: `url(${imgImporter(categSlug)})` }}
                ></div>
                <div className={styles.TitleWrp}>
                    <div className={styles.Title}>
                        {categName}
                    </div>
                </div>
            </div>
        );
    }
}

export default Category;