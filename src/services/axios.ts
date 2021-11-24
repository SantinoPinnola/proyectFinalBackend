import axios from 'axios';
import { newProductI } from '../interfaces/productsInterfaces';

  
const url = 'http://localhost:8080/api/products';

export const axiosGet = async () => {
    await axios
      .get(url)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
};


const urlID = 'http://localhost:8080/api/products/618da951fb2f9b4b20b9e002';

export const axiosGetID = async () => {
    await axios
      .get(urlID)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error.message);
      });
};

const data : newProductI = {
    name: 'foo',
    price: 50,
    description: 'description',
    thumbnail: 'blabla.com',
    stock : 50
};
  
export const axiosPost = async () => {
    await axios
    .post(url, data)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error.message);
    });
};
  

const urlDelete = "http://localhost:8080/api/products/delete/618da954fb2f9b4b20b9e005"

export const axiosDelete = async () => {
    await axios
    .delete(urlDelete)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error.message);
    });
};

const update = "http://localhost:8080/api/products/update/618da951fb2f9b4b20b9e002";

const dataUpdate : newProductI = {
    name: 'updateado',
    price: 20,
    description: 'description',
    thumbnail: 'blablasda.com',
    stock : 40
};
  
export const axiosUpdate = async () => {
    await axios
    .put(update, dataUpdate)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error.message);
    });
};