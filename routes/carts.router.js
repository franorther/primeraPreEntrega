import { Router } from "express";
import { CartManager } from '../src/cartManager.js'

const cartManager = new CartManager('../files/carts.json')
const router = Router();

router.post('/', async (req, res) => {
    const products = await req.body;
    const newCart = await cartManager.addCart(products);
    res.json({ message: "Cart created", newCart });
});

router.get('/', async (req, res) => {
    const carts = await cartManager.getCarts();
    res.json({ carts });
});


router.get('/:idCart', async (req, res) => {
    const cart = await cartManager.getCartById(req.params.idCart);
    res.json({ cart });

});


router.post('/:idCart/product/:idProduct', async (req, res) => {
    const idCart = req.params.idCart;
    const idProduct = req.params.idProduct;
    const quantity = req.body.quantity;
    const newProduct = await cartManager.addProductToCartById(idCart, idProduct, quantity);
    console.log(newProduct)
    if(newProduct === "Not found"){
        res.json({ message: newProduct });
    }else{
        res.json({ message: "product added successfully", newProduct });
    }
});


export default router;