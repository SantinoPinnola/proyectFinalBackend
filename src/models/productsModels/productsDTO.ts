import  { ProductI} from '../../interfaces/productsInterfaces'



export interface ProductDTO {
    name : string;
    priceUSD : number;
    description : string;
    fyh : string;
}

export const productDTO  = (product : ProductI) : ProductDTO => {
    return {
        name : product.name,
        priceUSD : product.price * 200,
        description : product.description,
        fyh : new Date().toLocaleString(),
    }
}