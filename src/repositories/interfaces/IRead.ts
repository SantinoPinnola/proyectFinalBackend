export interface IRead <T> {
    find() : Promise <T[]>;
}