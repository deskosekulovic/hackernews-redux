import { store } from '../store/configureStore';
import { FETCHING_DATA, SET_ITEMS, SET_ACTIVE_ITEMS, TIMESTAMP } from '../constants';
import { fetchIds, fetchItems, fetchItem } from '../utilities/helper.jsx';

const arrayToObject = (arr, keyField) =>
    Object.assign({}, ...arr.map(item => item && !item.deleted && !item.dead && ({[item[keyField]]: item})));

export const fetchItemsFromTypes = (basePath, name, page, update, newIds) => dispatch => {
    const now = Date.now();
    let ids;
    let old = false;
    let storeIds=store.getState().stories[basePath];
    const timestamp = store.getState().stories.timestamps[`${name}_timestamp`];

    if(newIds!==null){
        ids = newIds;
    }else{
        ids = storeIds;
    }

    if(now-timestamp >= 1000 * 60 * 1){
        old=true;
    }

    !update && dispatch(fetching());

    return (ids.length && !old ? Promise.resolve(ids) : fetchIds(name)).then(ids=>{
        let data = {[`${name}_timestamp`]: Date.now()};
        if(!timestamp || old){
            dispatch(setItems(TIMESTAMP, data));
        }

        dispatch(itemIds(basePath.toUpperCase(), ids));
        const activeIds = ids.slice(30*(page-1),30*page);
        dispatch(setActiveItems(SET_ACTIVE_ITEMS, activeIds));
        return activeIds;
    }).then(i=>fetchItems(i)).then(items=>arrayToObject(items, 'id')).then(items=>{
        dispatch(setItems(SET_ITEMS, items));
    });
};

export const fetchKids = (data) => dispatch => {
    if(data.length>0){
        let children=[];
        data.map(item=> {
            if(item.kids){
                children=[...children,...item.kids];
            }
        });
        children.length>0 && fetchItems(children).then(items=>{
            let arr = arrayToObject(items, 'id');
            dispatch(setItems(SET_ITEMS, arr));
            dispatch(fetchKids(items));
        });
    }
};

export const fetchData = (name, id) => dispatch => {
    dispatch(fetching());
    fetchItem(name, id).then(item=>{
        let obj = {[item.id]:item};
        dispatch(setItems(SET_ITEMS, obj));
    });
};

export const fetching = () => ({
    type: FETCHING_DATA
});

export const itemIds = (type, ids) => ({
    type,
    ids
});

export const setItems = (type, data) => ({
    type,
    data
});

export const setActiveItems = (type, data) => ({
    type,
    data
});