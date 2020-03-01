import React, { Fragment } from 'react';
import { shouldUpdate } from 'recompose';
import _isEmpty from 'lodash/isEmpty';
import _isEqual from 'lodash/isEqual';
import PropTypes from 'prop-types';
import Categories from './components/Categories';
import Subcategories from './components/Subcategories';
import RotatingBlock from '../RotatingBlock';
import Filters from '../Filters';
import boilerRepairImg from '../../assets/images/other/boiler1.b87a7cb2.jpg';
import detailsImg from '../../assets/images/other/details1.5a1fd390.jpg';
import installingImg from '../../assets/images/other/installing.54615328.jpg';


import styles from './CategoryMenu.module.scss';

const updateChecker = (props, nextProps) => {
    return !_isEmpty(nextProps.filters) && !_isEqual(props.filters, nextProps.filters) ||
    props.activeIndex !== nextProps.activeIndex || !_isEqual(props.categories, nextProps.categories);
} 

const CategoryMenu = ({
    categories,
    switchCheckedCategory,
    activeIndex,
    makeProductsRequest,
    filters,
    setActiveFilter,
    deleteActiveFilter,
    sendActiveFilter,
    switchSubcategory,
    revertCurrentPage,
    setRefSubcategories,
    windowWidth
}) => (
        <div className={styles.CategoryMenu}>
            <Categories
                categories={categories}
                switchCheckedCategory={switchCheckedCategory}
                makeProductsRequest={makeProductsRequest}
            />
            <div className={styles.BlocksAndBanner}>
                {windowWidth >= 1366 ?
                    <Fragment>
                        <RotatingBlock
                            outerClassName={styles.RotatingBlock}
                            headTitle={'Ремонт'}
                            preface={'Ремонт котлов, насосов, газовых колонок и водонагревателей'}
                            description={`Качественный ремонт газовых котлов и водонагревателей.`}
                            imgSrc={boilerRepairImg}
                        />
                        <RotatingBlock
                            outerClassName={styles.RotatingBlock}
                            headTitle={'Установка оборудования'}
                            preface={'Установка котлов, газовых колонок, насосов и водонагревателей'}
                            description={`Наш персонал выполняет все виды установок.`}
                            imgSrc={installingImg}
                        />
                        {/* <div className={styles.BannersWrp}>
                            <HomeBanners homeBanners={homeBanners} />
                        </div> */}
                        <RotatingBlock
                            outerClassName={styles.RotatingBlock}
                            headTitle={'Продажа запчастей и комплектующих'}
                            preface={'Огромный выбор запчастей и комплектующих'}
                            description={`У нас Вы можете заказать запчасти ведущих европейских
                            производителей.`}
                            imgSrc={detailsImg}
                        />
                    </Fragment> :
                    null        
                }
            </div>
            <Subcategories
                category={categories[activeIndex]}
                switchSubcategory={switchSubcategory}
                makeProductsRequest={makeProductsRequest}
                revertCurrentPage={revertCurrentPage}
                setRefSubcategories={setRefSubcategories}
            />
            {/* {!_isEmpty(filters) ?
                <Filters
                    filters={filters}
                    setActiveFilter={setActiveFilter}
                    deleteActiveFilter={deleteActiveFilter}
                    sendActiveFilter={sendActiveFilter}
                /> :
                <div/>
            } */}
        </div>
    );

CategoryMenu.propTypes = {
    categories: PropTypes.array
}
CategoryMenu.defaultProps = {
    categories: []
}

export default shouldUpdate(
    (props, nextProps) => updateChecker(props, nextProps)
    )(CategoryMenu);