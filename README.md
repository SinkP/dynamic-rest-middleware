# Dynamic rest middleware (for Django on server side)

This is a library for generating a valid django dynamic rest request:
- URL
- Filters
- Modificators
- Include
- Exclude
- Sort
- Page size
- Page

## How to install
```sh
yarn add dynamic-rest-middlewar
```
```sh
npm i dynamic-rest-middlewar
```



## How to use
Library export function `getUrl` you should pass params

### Params
Name  | Type | Discription | Example
------------- | ------------- | ------------- | -------------
url  | string | Url to some entity | `users`
filters  | array of `Filter` | Array of `Filters` | `[ { name: 'name', value: 'John', mod: 'icontains' } ] `
include  | array of string | Array of includes | `[ 'songs.*', 'genre' } ] `
exclude  | array of string | Array of excludes | `[ 'favorite.*', 'likes' } ] `
sort  | array of `Sort` | Array of `Sort` | `[ { field: 'views', not: true } ] `
excludeAll  | boolean | Exclude all fields trought add exclude[]=*.* | `true `
pageSize  | number | Specify the number of records on page | ` 120 `
page  | number | Specify the number of page | ` 2 `

### Filters
Name  | Type | Discription | Example
------------- | ------------- | ------------- | -------------
field  | string | Field of filter | `likes`
value  | string | Value of field | ` 24 `
mod  | string | Modificator of filtering (icontains, in...) | `startswith`
not  | boolean | Reverse lookup | `true`

### Sort
Name  | Type | Discription | Example
------------- | ------------- | ------------- | -------------
field  | string | Field of sort | `id`
not  | boolean | Reverse sorting | `true`

##### I would be extremely happy to receive feedback, comments and other ways to improve the library and documentation :з