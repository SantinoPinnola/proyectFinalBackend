export interface newProductI {
    name: string;
    price: number;
    description : string;
    thumbnail : string;
    stock : number;
}
  
  export interface ProductI {
    _id: string;
    name: string;
    price: number;
    description : string;
    thumbnail : string;
    timestamp : number;
}
  
export interface ProductQuery {
  name?: string;
  _id? : string;
  price? : number;
  priceMin?: number;
  priceMax?: number;
  stockMin?: number;
  stockMax?: number;
}
  
  export interface ProductBaseClass {
    get(id?: string | undefined) : any;
    add(data: newProductI): Promise<ProductI>;
    update(id: string, newProductData: newProductI): Promise<ProductI>;
    delete(id: string): Promise<void>;
    query(options: ProductQuery): Promise<ProductI[]>;
}