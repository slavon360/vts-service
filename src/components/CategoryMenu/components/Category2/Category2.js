import React, { Component, Fragment } from 'react';
import cx from 'classnames';
import * as paths from '../../../../constants/paths';

// import zapchastiVodonagrevateli from '../../../../assets/images/catalog/boilery/zapchasti-k-vodonagrevatelyam.jpg';
// import zapchastiKolonki from '../../../../assets/images/catalog/kolonki/zapchasti_kolonki.jpg';
// import zapchastiElektrKotly from '../../../../assets/images/catalog/kotly/zapchasti-k-elektricheskim.jpg';
// import zapchastiGazKotlyImg from '../../../../assets/images/catalog/kotly/zapchasti-k-gazovym.jpg';
// import kotlyGazovye from '../../../../assets/images/catalog/kotly/kotly-gazovye.jpg';
// import kotlyElektricheskie from '../../../../assets/images/catalog/kotly/elektrokotly.jpg';
// import boileryImg from '../../../../assets/images/catalog/boilery/boilery.jpg';
// import programmatory from '../../../../assets/images/catalog/programmatory/programmatory.jpg';
// import zapchastiImg from '../../../../assets/images/catalog/zapchasti/zapchasti.jpg';

import styles from './Category2.module.scss';

// const imgImporter = (name) => {
//     switch (name) {
//         case 'kotly-gazovye':
//             return kotlyGazovye;
//         case 'kotly-elektricheskie':
//             return kotlyElektricheskie;
//         case 'boilery':
//             return boileryImg;
//         case 'zapchasti':
//             return zapchastiVodonagrevateli;
//         case 'zapchasti-gazovye-kotly':
//             return zapchastiGazKotlyImg;
//         case 'zapchasti-elektro-kotly':
//             return zapchastiElektrKotly;
//         case 'zapchasti-gazovye-kolonki':
//             return zapchastiKolonki;
//         case 'zapchasti-elektro-vodonagrevateli':
//             return zapchastiVodonagrevateli;
//         case 'programmatory-termoregulyatory':
//             return programmatory;
//         default: return kotlyGazovye;
//     }
// }

class Category extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.category.checked !== this.props.category.checked;
    }
    makeCheckedCategory = event => {
        const {
            category: { _id, index },
            switchCheckedCategory,
            makeProductsRequest,
            toggleMenu,
            dropCategoriesOpenedName
        } = this.props;
        dropCategoriesOpenedName();
        switchCheckedCategory(_id, index);
        makeProductsRequest();

        if (window.innerWidth <= 768) {
            toggleMenu(event);
        }
    }
    render() {
        const { category: { categSlug, categName, checked, isLink } } = this.props;
        return (
            <Fragment>
                {isLink ?
                    <li
                        
                        className={styles.NavSubmenuItem}
                    >
                        <a href="/services" className={styles.NavSubmenuLink}>
                            {categName}
                        </a>
                    </li>
                :
                <li
                    onClick={this.makeCheckedCategory}
                    className={styles.NavSubmenuItem}
                >
                    <div className={styles.NavSubmenuLink}>
                        {categName}
                    </div>
                </li>
                }
            </Fragment>
            // <div
            //     onClick={this.makeCheckedCategory}
            //     className={cx(styles.Category, { [styles.Checked]: checked })}>
            //     <div
            //         className={styles.CategoryImg}
            //         // style={{ backgroundImage: `url(${imgImporter(categSlug)})` }}
            //     ></div>
            //     <div className={styles.TitleWrp}>
            //         <div className={styles.Title}>
            //             {categName}
            //         </div>
            //     </div>
            // </div>
        );
    }
}

export default Category;