export function setTitle(home, page) {
    home!==undefined ?
        document.title = 'Hacker News - ' + page :
        document.title = 'Hacker News';
}

export function get_host(url) {
    return url.replace(/(\w+:\/\/(w{3}.)?)?([^/]+).*$/,'$3');
}

export const arrayToObject = (arr, keyField) =>
    Object.assign({}, ...arr.map(item => item && !item.deleted && !item.dead && ({[item[keyField]]: item})));
