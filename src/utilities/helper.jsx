import firebase from 'firebase';

import { store } from '../store/configureStore';

const config = {
    databaseURL: 'https://hacker-news.firebaseio.com'
};

const app = firebase.initializeApp(config);
export const db = app.database().ref('v0');

export function fetchIds(name) {
    return new Promise(resolve=>{
        db.child(name).once('value').then(snapshot => {
            resolve(snapshot.val());
        });
    });
}

// export function fetchIds(name) {
//     const URL = `https://hacker-news.firebaseio.com/v0/${name}.json`;
//
//     return fetch(URL).then(response => {
//         return response.json();
//     }).then(ids => ids);
// }

export function fetchItems(ids) {
    return Promise.all(ids.map(id => fetchItem('item', id)));
}

export function fetchItem(type, id) {
    // let url = `https://hacker-news.firebaseio.com/v0/${type}/${id}.json`;
    let item = store.getState().stories.items[id];
    const now = Date.now();
    let old = false;
    if(item!==undefined){
        if(now-item.timestamp >= 1000 * 60 * 1){
            old=true;
        }
    }
    return item && !old ? Promise.resolve(item) :
    //     fetch(url).then(response => response.json()).then(item=>{
    //         return Object.assign({}, item, {visible: true, timeStamp: Date.now()});
    //     });
        new Promise(resolve=>{
            db.child(`${type}/${id}`).once('value').then(snapshot => {
                let item = Object.assign({}, snapshot.val(), {visible: true, timestamp: Date.now()});
                resolve(item);
            });
        });
}

export function watchList (type, cb) {
    let first = true;
    const ref = db.child(type);
    const handler = snapshot => {
        if (first) {
            first = false;
        } else {
            cb(snapshot.val());
        }
    };
    ref.on('value', handler);
    return () => {
        ref.off('value', handler);
    };
}

/*************************************************/

export function setTitle(home, page){
    home!==undefined ?
        document.title = 'Hacker News - ' + page :
        document.title = 'Hacker News';
}

export function get_host(url){
    return url.replace(/(\w+:\/\/(w{3}.)?)?([^/]+).*$/,'$3');
}
