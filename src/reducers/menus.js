import { composeReducer } from 'redux-compose-reducer';
import { Map, List, fromJS } from 'immutable';

const initialState = fromJS({
    catalog: [],
    activeIndex: 0,
    selectedSubcategoryId: null,
    selectedCategoryId: null
});

function getCatalogMenu(state, { catalog, selectedCategoryId }) {
    if (catalog && catalog.length) {
        catalog[0].checked = true;
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
        return item;
    });
    return state.merge({ catalog: fromJS(updatedCatalog), selectedCategoryId });
    }
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

export default composeReducer(
    'menus',
    {
        getCatalogMenu,
        switchCheckedCategory
    },
    initialState
);