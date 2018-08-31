import { FETCHING_DATA, SET_ITEMS, SET_ACTIVE_ITEMS, TIMESTAMP } from '../constants';

const initState = {
    loading: false,
    activeItems: [],
    items: {},
    news: [],
    newest: [],
    show: [],
    ask: [],
    jobs: [],
    timestamps: {}
};

const stories = (state = initState, action) => {
    switch (action.type) {
    case FETCHING_DATA:
        return {...state, loading: true};
    case SET_ITEMS:
        return {...state, loading: false, items: {...state.items,...action.data}};
    case SET_ACTIVE_ITEMS:
        return {...state, activeItems: action.data};
    case TIMESTAMP:
        return {...state, timestamps: {...state.timestamps, ...action.data}};
    case `${action.type}`:
        return {
            ...state, [`${action.type.toLowerCase()}`]: action.ids
        };
    // case NEWS:
    //     return {...state, news: action.ids};
    // case NEWEST:
    //     return {...state, newest: action.ids};
    // case SHOW:
    //     return {...state, show: action.ids};
    // case ASK:
    //     return {...state, ask: action.ids};
    // case JOBS:
    //     return {...state, jobs: action.ids};
    default:
        return state;
    }
};

export default stories;
