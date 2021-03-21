import { composeReducer } from 'redux-compose-reducer';
import { fromJS, List, Map } from 'immutable';


const initialState = fromJS({
    catalog: [],
    categNames: [],
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

function setCategNames(catalog) {
    const names = ['запчасти', 'водонагреватели', 'котлы', 'программаторы, терморегуляторы'];
    const categNames = names.reduce((result, currentName) => {
        const uniqueSubcategory = catalog.find(({categName}) => categName.toLowerCase() === currentName);
        const categ = {
            name: currentName,
            id: uniqueSubcategory && uniqueSubcategory._id,
            index: uniqueSubcategory && uniqueSubcategory.index,
            subcategories: catalog.filter(({categName}) => categName.toLowerCase().includes(currentName) && categName.toLowerCase() !== currentName)
        };
        return result = [...result, categ];
    }, []);

    return [
        {
            name: 'ремонт',
            subcategories: [
                {
                    _id: '012',
                    categName: 'Ремонт газовых и электрических котлов',
                    isLink: true
                },
                {
                    _id: '013',
                    categName: 'Ремонт газовых колонок',
                    isLink: true
                },
                {
                    _id: '014',
                    categName: 'Ремонт бойлеров и проточных электроводонагревателей',
                    isLink: true
                },
                {
                    _id: '015',
                    categName: 'Ремонт насосов',
                    isLink: true
                }
            ]
        },
        ...categNames
    ];
}

function getCatalogMenu(state, { catalog, selectedCategoryId }) {
    if (catalog && catalog.length) {
        const updatedCatalog = catalog.map(item => {
        const newSubcatNames = item.subCategNames.reduce((result, current, index) => {
            const obj = {
                name: current,
                checked: false,
                link: item.subCategSlug[index],
                id: item.subCategIds[index],
                image_url: item.subCategImages[index] && item.subCategImages[index].secure_url
            }
            result.push(obj);
            return result;
        }, []);
        item.subCategNames = newSubcatNames;
        item.checked = item._id === selectedCategoryId;
        return item;
    });
    return state.merge({
        catalog: fromJS(updatedCatalog), selectedCategoryId,
        categNames: setCategNames(catalog)
    });
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
    const activeIndex = state.get('activeIndex');
    const updCatalog = state.get('catalog').update(activeIndex, (catalog) => {
        return catalog.update('subCategNames', subcatNames => subcatNames.map(subcat => subcat.set('checked', false)));
    });
    return state.merge({
        selectedSubcategoryId: null,
        activeIndex,
        catalog: updCatalog
    });
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