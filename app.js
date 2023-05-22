import express, { response } from "express"
import { ProductManager } from "./desafio3.js"
import fs from "fs"

const app = express()

let db = JSON.parse(await fs.promises.readFile("./productsDb.json"))

app.get("/", async (request, response) => {
    response.send("Comenzando el Desafío 3...")
})

//Implementación query params
app.get ("/products", async (request, response) => {
    const limit = request.query.limit
    if(!limit) {
        response.send (db)
    } else {
        let cantidad = db.slice(0, limit)
        response.send(cantidad)
    }
})

// Implementación de la ruta pid (products id)
app.get("/products/:pid", async (request, response) => {
    const id = request.params.pid
    const product = db.find(item => item.id == id)
    if (!product) {
        return response.send({error: "El producto no existe"}) 
    } else {
        return response.send(product)
    }
})

app.listen(8080, () => console.log("Server Up..."))