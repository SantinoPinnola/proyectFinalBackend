export interface IWrite <T> {
    find( item : T ) : Promise <T[]>;
}