import express from "express";
import { ProdutcManager } from "./index.js";

const app = express();
const productManager = new ProdutcManager();

//routes
app.get('/products', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProdutcs(limit);
        res.json({ products })
    } catch (e) {
        res.send(e)
    }
});

app.get('/products/:pid', async (req, res) => {
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


// Server
const PORT = 8081
app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT}`);
});