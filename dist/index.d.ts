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
export declare function getUrl(options: Options): string;
