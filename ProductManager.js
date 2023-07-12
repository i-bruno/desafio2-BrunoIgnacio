import {promises as fs} from "fs"

class ProductManager{
    constructor(){
        this.path = "./productos.txt";
        this.products = [];
    }

    static id = 0;

    addProduct = async (title, description, price, thumbnail, code, stock) => {
        
        ProductManager.id++;

        let nuevoProducto ={
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
            id: ProductManager.id
        }

        this.products.push(nuevoProducto);




        await fs.writeFile(this.path, JSON.stringify(this.products));
    };

    readProducts = async() =>{
        let res = await fs.readFile(this.path, "utf-8");
        return JSON.parse(res);
    }

    getProducts = async () =>{
        let respuesta = await this.readProducts();
        return console.log(respuesta);
    }

    getProductsById = async (id) => {
        let resId = await this.readProducts();
        if(!resId.find(producto => producto.id === id)){
            console.log("No se encuentra el producto")
        } else {
            console.log(resId.find(producto => producto.id === id));
        }
        
    }

    deleteProductsById = async (id) =>{
        let resId = await this.readProducts();
        let filtro =  resId.filter(producto => producto.id != id)
        await fs.writeFile(this.path, JSON.stringify(filtro));

    }

    updateProducts = async ({id, ...producto}) =>{
        await this.deleteProductsById(id);
        let productoAnt = await this.readProducts();

        let modifProd = [{id, ...producto}, ... productoAnt];
        await fs.writeFile(this.path, JSON.stringify(modifProd));
    }
}

const producto = new ProductManager;

producto.addProduct("Mr. Gwyn - Alessandro Baricco", "Novela", 5000, "./img/portada.png", "LIB123", 1);
producto.addProduct("Mr. Vértigo - Paul Auster", "Novela", 6000, "./img/portada1.png", "LIB124", 10);
producto.addProduct("scott Pilgrim I - Bryan Lee O'Malley", "Comic", 2000, "./img/portada2.png", "LIB125", 15);
producto.addProduct("El eternauta - Héctor Germán Oesterheld", "Comic", 1500, "./img/portada3.png", "LIB126", 5);
producto.addProduct("Hinchadas - Pablo Alabarces", "Novela", 6500, "./img/portada4.png", "LIB126", 20);

producto.getProducts();
producto.getProductsById();
producto.deleteProductsById();

producto.updateProducts(
    {  
        title: 'Mr. Gwyn - Alessandro Baricco',
        description: 'Novela',
        price: 2500,
        thumbnail: './img/portada.png',        
        code: 'LIB123',
        stock: 1,
        id: 1
    }
)