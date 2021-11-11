import Joi from 'joi';

export const userJoiSchema = Joi.object({
  firstName: Joi.string().min(4).max(15).required(),
  lastName: Joi.string().min(4).max(15).required(),
  email: Joi.string().email().required(),
  username: Joi.string().min(5).max(10).required(),
  password: Joi.string().required(),
  age : Joi.number().required(),
  address : Joi.string().required()
});

export interface NewUserI {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  age : number;
  address : string;
}

export interface UserI {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  age : number;
  address : string;
}

export interface UserQuery {
  username?: string;
  email?: string;
}

export interface UserBaseClass {
  get(id?: string | undefined): Promise<UserI[]>;
  add(data: NewUserI): Promise<UserI>;
  update(id: string, newProductData: NewUserI): Promise<UserI>;
  delete(id: string): Promise<void>;
}