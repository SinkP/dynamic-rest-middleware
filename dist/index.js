"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEntityIndex = exports.getEntity = exports.getUrl = void 0;
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
function getEntity(entities, id) {
    if (!entities || typeof entities !== 'object') {
        return null;
    }
    for (const entity of entities) {
        if (entity.id === id) {
            return entity;
        }
    }
    return null;
}
exports.getEntity = getEntity;
function getEntityIndex(entities, id) {
    let result = -1;
    for (let i = 0; i < entities.length; i++) {
        if (entities[i].id === id) {
            result = i;
        }
    }
    return result;
}
exports.getEntityIndex = getEntityIndex;
