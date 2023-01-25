import fs from 'fs';

export class ProdutcManager {

  constructor() {
    this.produtcs = []
    this.path = './files/products.json'
  }

  async getProdutcs(limit) {
    try {
      if (fs.existsSync(this.path)) {
        console.log(this.path)
        const produtcs = await fs.promises.readFile(this.path, 'utf-8')
        if (limit) {
          const produtcsJS = JSON.parse(produtcs).slice(0, limit)
          //console.log("Entró")
          return produtcsJS
        } else {
          const produtcsJS = JSON.parse(produtcs)
          return produtcsJS
        }

      } else {
        return []
      }
    } catch (error) {
      return error;
    }
  }


  async addProdutc(product) {
    const { title, description, code, price, stock, category, thumbnails, status } = product
    try {
      if (!title || !description || !price || !code || !stock || !category) {
        return 'Error, incompleted product';
      } else {
        const isCode = this.#evaluarCode(code)
        if (isCode) {
          console.log('That code already exist, try again')
        } else {
          console.log("Entró")
          const produtc = {
            id: await this.#generarId(),
            title,
            description,
            code,
            price,
            stock,
            category,
            thumbnails: [],
            status: true,
          }
          const getProd = await this.getProdutcs()
          getProd.push(produtc)
          console.log(getProd)

          await fs.promises.writeFile(this.path, JSON.stringify(getProd, null, 2))
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  async getProdutcById(idProdutc) {
    try {
      const gettingProd = await this.getProdutcs();
      console.log(gettingProd);
      const produ = gettingProd.find((p) => p.id === parseInt(idProdutc));
      if (produ) {
        console.log(produ)
        return produ
      } else {
        return 'Product no found'
      }
    } catch (error) {
      console.log(error)
    }
  }

  async updateProdutc(idProdutc, change) {
    console.log("Entró")
    let reading = await fs.promises.readFile(this.path, 'utf-8')
    reading = JSON.parse(reading)
    let produtc = await this.getProdutcById(idProdutc)
    if (produtc) {
      produtc = { ...produtc, ...change }
      reading = reading.map(prod => {
        if (prod.id == produtc.id) {
          prod = produtc
        }
        return prod
      })
      reading = JSON.stringify(reading, null, 2)
      await fs.promises.writeFile(this.path, reading)
      console.log(JSON.parse(reading))
      return reading
    } else {
      return null
    }
  }

  async deleteProdutc(idProdutc) {
    let reading = await fs.promises.readFile(this.path, 'utf-8')
    reading = JSON.parse(reading)
    let produtc = await this.getProdutcById(idProdutc)
    if (produtc) {
      const filtered = reading.filter(prod => prod.id != idProdutc)
      await fs.promises.writeFile(this.path, JSON.stringify(filtered, null, 2))
      return filtered
    }
  }


  async #generarId() {
    const readProd = await this.getProdutcs()
    let id =
      readProd.length === 0
        ? 1
        : readProd[readProd.length - 1].id + 1
    return id
  }

  #evaluarCode(code) {
    return this.produtcs.find(produtc => produtc.code === code)
  }



}








































