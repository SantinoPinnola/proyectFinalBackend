import  mongoose  from "mongoose";
import { IRead } from '../interfaces/IRead';
import { IWrite } from "../interfaces/IWrite";

export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> { 

    public readonly _collection: any;

  //we created constructor with arguments to manipulate mongodb operations
  constructor(collectionName: string, schema : mongoose.Schema<any, mongoose.Model<any, any, any>, {}> | undefined) {
    this._collection = mongoose.model(collectionName, schema);
  }

  async find() : Promise<T[]> {
    const result = this._collection.find().lean();
    return result
  }

  async create( item : T) : Promise<T> {
    const result = this._collection.create(item);
    return result;
  }
}



