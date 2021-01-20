"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUrl = void 0;
function setUrl(array, callback) {
    let result = [];
    for (const item of array) {
        result.push(callback(item));
    }
    return result.join('&') + '&';
}
function getUrl(options) {
    let url = options.url + '?';
    if (options.filters && options.filters.length) {
        url += setUrl(options.filters, (filter) => {
            return `filter{${filter.not ? '-' : ''}${filter.field}${filter.mod ? '.' + filter.mod : ''}}=${filter.value}`;
        });
    }
    if (options.include && options.include.length) {
        url += setUrl(options.include, (include) => {
            return `include[]=${include}`;
        });
    }
    if (options.exclude && options.exclude.length) {
        url += setUrl(options.exclude, (exclude) => {
            return `exclude[]=${exclude}`;
        });
    }
    if (options.sort && options.sort.length) {
        url += setUrl(options.sort, (sort) => {
            return `sort[]=${sort.not ? '-' : ''}${sort.field}`;
        });
    }
    if (options.excludeAll) {
        url += 'exclude[]=*&';
    }
    return url;
}
exports.getUrl = getUrl;
