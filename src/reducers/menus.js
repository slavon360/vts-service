import { composeReducer } from 'redux-compose-reducer';
import { fromJS } from 'immutable';


const initialState = fromJS({
    catalog: [],
    activeIndex: 0,
    selectedSubcategoryId: null,
    selectedCategoryId: null,
    filters: { },
    activeFilters: { }
});

function setActiveFilter(state, { filterName, filterValue }) {
    return state.updateIn(['activeFilters', filterName], (filters) => !filters ? [filterValue] : [...filters, filterValue]);
}

function deleteActiveFilter(state, { filterName, filterValue }) {
    return state.updateIn(['activeFilters', filterName], (filters) => filters.filter(item => item !== filterValue));
}

function getCatalogMenu(state, { catalog, selectedCategoryId }) {
    if (catalog && catalog.length) {
        const updatedCatalog = catalog.map(item => {
        const newSubcatNames = item.subCategNames.reduce((result, current, index) => {
            const obj = {
                name: current,
                checked: false,
                link: item.subCategSlug[index],
                id: item.subCategIds[index]
            }
            result.push(obj);
            return result;
        }, []);
        item.subCategNames = newSubcatNames;
        item.checked = item._id === selectedCategoryId;
        return item;
    });
    return state.merge({ catalog: fromJS(updatedCatalog), selectedCategoryId });
    }
}

function switchSubcategory(state, { selectedSubcategoryId }) {
    const newState = state.set('selectedSubcategoryId', selectedSubcategoryId);
    return newState.update('catalog', catalog => catalog.map((catal) => {
        return catal.update('subCategNames', subCategNames => subCategNames.map((subcat) => {
            let newSubcat;
            if (subcat.get('id') === selectedSubcategoryId) {
                newSubcat = subcat.set('checked', true);
            } else {
                newSubcat = subcat.set('checked', false);
            }
            return newSubcat;
        }))
    }))
}

function switchCheckedCategory(state, { id, index }) {
    const newState = state.merge({ activeIndex: index, selectedCategoryId: id });
    return newState.update('catalog', catalog => catalog.map(item => {
        let newItem;
        if (item.get('_id') === id) {
            newItem = item.set('checked', true);
        }
        else {
            newItem = item.set('checked', false);
        }  
        return newItem;
    }))
}

function resetSelectedSubcategoryId(state) {
    return state.set('selectedSubcategoryId', null);
}

function getFilters(state, { filters }) {
    const entries = Object.entries(filters);
    const updFilters = entries.reduce((result, current) => {
        if (typeof current[1] === 'number') {
            result = {
                ...result,
                ranges: [...result.ranges, current]
            }
        } else {
            result = {
                ...result,
                values: [...result.values, current]
            }
        }
        return result;
    }, { ranges: [], values: [] });
    return state.set('filters', fromJS(updFilters));
}

export default composeReducer(
    'menus',
    {
        getCatalogMenu,
        switchCheckedCategory,
        getFilters,
        setActiveFilter,
        deleteActiveFilter,
        switchSubcategory,
        resetSelectedSubcategoryId
    },
    initialState
);