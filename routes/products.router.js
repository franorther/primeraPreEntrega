import { Router } from "express";
import { ProdutcManager } from '../src/productManager.js'

const router = Router();
const productManager = new ProdutcManager('../files/products.json')

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

router.post('/', async (req, res) => {
    const product = req.body
    console.log(product)
    const addProduct = await productManager.addProdutc(product)
    //console.log(addProduct)
    if (addProduct === "Error, incompleted product") {
        res.json({ message: addProduct })
    } else {
        res.json({ message: 'Product added successfully', addProduct })
    }

})

router.put('/:pid', async (req, res) => {
    const { pid } = req.params;
    console.log(typeof pid)
    const product = req.body
    console.log(product)
    try {
        const updateProduct = await productManager.updateProdutc(pid, product)
        console.log(updateProduct)
        res.json({ message: 'Product updated successfully' })
    } catch (error) {
        console.log(error)
        return error
    }
})

router.delete('/:pid', async (req, res) => {
    const { pid } = req.params
    try {
        const deleteProduct = await productManager.deleteProdutc(pid)
        console.log(deleteProduct)
        res.json({ message: 'Product deleted' })
    } catch (error) {
        console.log(error)
        return error
    }
})

export default router;















