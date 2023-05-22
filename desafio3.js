import fs from "fs"

 export class ProductManager {
    #products
    constructor(path) {
        this.#products = []
        this.path = path
        this.format = `utf-8`
    }

    getProducts = () => this.#products

    getProductsById = (id) => {
        const product = this.#products.find(item => item.id === id)
        if (!product) return "Not Found ID"
        return product
    }

    #generateId = () => (this.#products.length === 0 ? 1 : this.#products[this.#products.length-1].id + 1)

    #validate = (title, description, price, code, stock, img) => {
        if (!title || !description || !price || !code || !stock || !img) {
            return `[${title}]: Campos Incompletos`
        } else {
            const found = this.#products.find(item => item.code === code)
            if (!found) return true
            return `[${title}]: El código ya existe`
        }
    }
        
    addProducts = async(title, description, price, code, stock, img) => {
        if (this.#validate(title, description, price, code, stock, img) === true) {
            this.#products.push({id: this.#generateId(), title, description, price, code, stock, img}) 
            return await fs.promises.writeFile(this.path, JSON.stringify(this.#products, null, `\t`))
        } else {
            console.log(this.#validate(title, description, price, code, stock, img))
        }    
    }

    deleteProducts = async(id) => {
        let contenidoDel = JSON.parse(await fs.promises.readFile(this.path, this.format))
        const productDel = contenidoDel.filter (item => item.id != id)
        return await fs.promises.writeFile(this.path, JSON.stringify(productDel, null, `\t`))
    }
}

/*
const product = new ProductManager(`./productsDb.json`)
//Lista de Productos
product.getProducts()
//Productos Agregados
product.addProducts(`Books`, `Libro género fantástico`, `8000`, `2571`, `12`, "https://http2.mlstatic.com/D_NQ_NP_941946-MLA46913432105_072021-V.jpg")
product.addProducts(`Books`, `Libro género fantástico`, `8000`, `2572`, `12`, "https://http2.mlstatic.com/D_NQ_NP_941946-MLA46913432105_072021-V.jpg")
product.addProducts(`Books`, `Libro género fantástico`, `8000`, `2573`, `12`, "https://http2.mlstatic.com/D_NQ_NP_941946-MLA46913432105_072021-V.jpg")
product.addProducts(`Books`, `Libro género fantástico`, `8000`, `2574`, `12`, "https://http2.mlstatic.com/D_NQ_NP_941946-MLA46913432105_072021-V.jpg")
product.addProducts(`Books`, `Libro género fantástico`, `8000`, `2575`, `12`, "https://http2.mlstatic.com/D_NQ_NP_941946-MLA46913432105_072021-V.jpg")
product.addProducts(`Books`, `Libro género fantástico`, `8000`, `2576`, `12`, "https://http2.mlstatic.com/D_NQ_NP_941946-MLA46913432105_072021-V.jpg")
product.addProducts(`Computers`, `180000`, `1258`, `3`, "https://images.start.com.ar/EXO-L65-2.jpg")//Falta la descripción
product.addProducts(`Cell Phones`, `Samsung Galaxy`, `140000`, `1340`, `8`, "https://tienda.movistar.com.ar/media/catalog/produ…cf95fcf479279f9ae509ad/a/2/a23-negro-frente_1.png")
product.addProducts(`GPS`, `Garmin Portatil`, `6500`, `1340`, `6`, "https://m.media-amazon.com/images/I/71mxeYQJJFL.jpg") //Código repetido
product.addProducts(`TV`, `Samsung 75 pulgadas 4K`, `170000`, `8532`, `2`, "")
product.addProducts(`PS5`, `Consola de videojuegos`, `250000`, `6541`, `11`, "")
// Busqueda de productos por ID
console.log(product.getProductsById(2))
console.log(product.getProductsById(4))
// Productos eliminados
product.deleteProducts()
//Actualizar stock
product.updateProducts(1, 1500)
*/
