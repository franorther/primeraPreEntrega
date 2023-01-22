import fs from 'fs';

export class ProdutcManager {

  constructor() {
    this.produtcs = []
    this.path = './files/products.json'
  }

  async getProdutcs(limit) {
    try {
      if (fs.existsSync(this.path)) {
        const produtcs = await fs.promises.readFile(this.path, 'utf-8')
        if(limit){
          const produtcsJS = JSON.parse(produtcs).slice(0,limit)
          return produtcsJS
        }else{
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


  async addProdutc(title,description,code,price,stock,category,thumbnails,status) {
    try {
      if (!title || !description || !price || !code || !stock || !category) {
        return console.log('Error, incomplete product');
      } else {
        const isCode = this.#evaluarCode(code)
        if (isCode) {
          console.log('That code already exist, try again')
        } else {
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
          this.produtcs.push(produtc)
          await fs.promises.writeFile(this.path, JSON.stringify(this.produtcs, null, 2))
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
      const produ = gettingProd.find((p)=> p.id === parseInt(idProdutc));
      if(produ){
        console.log(produ)
        return produ
      }else{
        return 'Product no found'
      }
    } catch (error) {
      console.log(error)
    }
  }

  async updateProdutc(idProdutc, change) {
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


  #generarId() {
    let id =
      this.produtcs.length === 0
        ? 1
        : this.produtcs[this.produtcs.length - 1].id + 1
    return id
  }

  #evaluarCode(code) {
    return this.produtcs.find(produtc => produtc.code === code)
  }



}








































