# coderhouse-ecommerce
## Final Project
App created with NodeJS, using Typescript. The server is working with Express.


command to start the app:
```
npm run start

```

# ENDPOINTS

## Products  
- GET ROUTES: 
- localhost:8080/products/
DEVUELVE LA LISTA DE PRODUCTOS
    {
    "data": [
        {
            "_id": "61d627db08a44c278d6978ee",
            "name": "Test Product",
            "price": 435,
            "description": "Test description",
            "stock": 15,
            "timestamp": 1641424777703,
            "photos": [],
            "__v": 0
        },
        {
            "_id": "61d6287608a44c278d6978f1",
            "name": "Test Product",
            "price": 435,
            "description": "Test description",
            "stock": 15,
            "timestamp": 1641424777703,
            "photos": [],
            "__v": 0
        },
        {
            "_id": "61d62aa108a44c278d6978f3",
            "name": "Test Product",
            "price": 435,
            "description": "Test description",
            "stock": 15,
            "timestamp": 1641424777703,
            "photos": [],
            "__v": 0
        }
    ]
    }

- localhost:8080/products/:id




- POST ROUTES: localhost:8080/products/
-
- PUT ROUTES: localhost:8080/products/update/:id
- DELETE ROUTES: localhost:8080/products/delete/:id

## Cart
- GET ROUTES: localhost:8080/cart/list or localhost:8080/cart/list/:id
- POST ROUTES: localhost:8080/cart/add/:id
- DELETE ROUTES: localhost:8080/cart/delete/:id


