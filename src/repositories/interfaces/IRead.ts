export interface IWrite <T> {
    create( item : T ) : Promise <T>;
}