import { Router } from "express";
import { ProductManager } from '../src/productManager.js'

const router = Router();
const productManager = new ProductManager('../src/archivos/products.json')

router.get('/', async (req, res) => {
    try {
        const { limit } = req.query
        const products = await productManager.getProdutcs(limit)
        res.json({ products })
    } catch (error) {
        res.send(error)
    }

})

router.get('/:pid', async (req, res) => {
    const { pid } = req.params
    console.log(pid);
    try {
        const product = await productManager.getProdutcById(pid);
        console.log(product);
        if (product) {
            res.json({ product })
        } else {
            res.send('Product no found')
        }
    } catch (e) {
        res.send(e)
    }
})

router.post('/', async(req, res) => {
    const product = req.body
    console.log(product)
    const addProduct = await productManager.addProduct(product)
    console.log(addProduct)
    res.json({ message: 'Product added successfully', addProduct })
})

router.put('/:pid', async(req, res) => {
    const {idProduct} = req.params
    const product = req.body
    try {
        const updateProduct = await productManager.updateProduct(idProduct, ...product)
        console.log(updateProduct)
        res.json({ message: 'Product updated successfully'})
    } catch (error) {
        console.log('error')
        return error
    }
})

router.delete('/:pid', async(req, res) => {
    const {idProduct} = req.params
    try {
        const deleteProduct = await productManager.deleteProduct(idProduct)
        console.log(deleteProduct)
        res.json({ message: 'Product deleted'})
    } catch (error) {
        console.log('error')
        return error
    }
})

export default router;















