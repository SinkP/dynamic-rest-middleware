export interface Filter {
  field: string;
  value: string;
  mod?: string;
  not?: true;
}

export interface Sort {
  field: string;
  not?: true;
}

export interface Options {
  url: string;
  filters?: Filter[];
  include?: string[];
  exclude?: string[];
  sort?: Sort[];
  excludeAll?: true;
}

function setUrl<T>(array: T[], callback: (value: T) => string): string {
  let result: string[] = [];
  for (const item of array) {
    result.push(callback(item));
  }

  return result.join('&') + '&';
}

export function getUrl(options: Options): string {
  let url: string = options.url + '?';

  if (options.filters && options.filters.length) {
    url += setUrl(options.filters, (filter: Filter) => {
      return `filter{${filter.not ? '-' : ''}${filter.field}${filter.mod ? '.' + filter.mod : ''}}=${filter.value}`
    })
  }

  if (options.include && options.include.length) {
    url += setUrl(options.include, (include: string) => {
      return `include[]=${include}`;
    })
  }
  
  if (options.exclude && options.exclude.length) {
    url += setUrl(options.exclude, (exclude: string) => {
      return `exclude[]=${exclude}`;
    })
  }

  if (options.sort && options.sort.length) {
    url += setUrl(options.sort, (sort: Sort) => {
      return `sort[]=${sort.not ? '-' : ''}${sort.field}`;
    })
  }

  if (options.excludeAll) {
    url += 'exclude[]=*&'
  }

  return url;
}
