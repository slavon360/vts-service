import { createTypes } from 'redux-compose-reducer';
import { getFromAxios } from '../utils/apiRequester';
import { SITE_TYPES } from '../actions/site';
import _get from 'lodash/get';

const MENU_TYPES = createTypes('menus', [
    'getCatalogMenu',
    'switchCheckedCategory',
    'getFilters',
    'setActiveFilter',
    'deleteActiveFilter',
    'switchSubcategory',
    'resetSelectedSubcategoryId'
]);
const PRODUCTS_TYPES = createTypes('products', [
    'listProducts',
    'switchProductsLoading',
    'switchNextPage',
    'changeCurrentPage',
    'clearProductsList',
    'setTotalPages'
]);

export const setActiveFilter = (filterName, filterValue) => ({
    type: MENU_TYPES.setActiveFilter,
    filterName,
    filterValue
});

export const deleteActiveFilter = (filterName, filterValue) => ({
    type: MENU_TYPES.deleteActiveFilter,
    filterName,
    filterValue
});

export const getCatalogMenu = () => async (dispatch, getState) => {
    try {
        const { selectedCategoryId } = getState().menus;
        const json = await getFromAxios('/getCatalog');
        const catalog = _get(json, 'data', []);
        const categid = selectedCategoryId || catalog[0] && catalog[0]._id;

        dispatch({ type: MENU_TYPES.getCatalogMenu, catalog, selectedCategoryId: categid });
        dispatch({ type: SITE_TYPES.setLoadingState, loading: false });
    } catch (e) {
        console.error(e);
    }
};

export const getFilters = () => async (dispatch, getState) => {
    try {
        const { selectedCategoryId } = getState().menus;
        const json = await getFromAxios('/predefined-filters', { category: selectedCategoryId });
        const filters = _get(json, 'data', {});
        dispatch({ type: MENU_TYPES.getFilters, filters });
    } catch (e) {
        console.error(e);
    }
};

export const switchCheckedCategory = (id, index) => (dispatch) => {
    dispatch({ type: MENU_TYPES.switchCheckedCategory, id, index });
    dispatch({ type: PRODUCTS_TYPES.switchNextPage, nextPage: true });
    dispatch({ type: PRODUCTS_TYPES.changeCurrentPage, currentPage: 0 });
    dispatch({ type: PRODUCTS_TYPES.clearProductsList });
    dispatch({ type: MENU_TYPES.resetSelectedSubcategoryId });
};

export const switchSubcategory = (selectedSubcategoryId) => (dispatch) => {
    dispatch({ type: MENU_TYPES.switchSubcategory, selectedSubcategoryId });
    dispatch({ type: PRODUCTS_TYPES.switchNextPage, nextPage: true });
    dispatch({ type: PRODUCTS_TYPES.changeCurrentPage, currentPage: 0 });
    dispatch({ type: PRODUCTS_TYPES.clearProductsList });
};
