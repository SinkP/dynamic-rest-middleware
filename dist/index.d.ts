interface Filter {
    field: string;
    value: string;
    mod?: string;
    not?: true;
}
interface Sort {
    field: string;
    not?: true;
}
interface Options {
    url: string;
    filters?: Filter[];
    include?: string[];
    exclude?: string[];
    sort?: Sort[];
    excludeAll?: true;
}
interface Entity {
    [key: string]: any;
}
export declare function getUrl(options: Options): string;
export declare function getEntity(entities: Entity[], id: number | any): Entity | null;
export declare function getEntityIndex(entities: Entity[], id: number | null): number;
export {};
