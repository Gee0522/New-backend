const Product = require("../models/Product");
const auth = require("../auth");



// Create a new product
module.exports.addProduct = (reqBody) =>{

        let newProduct = new Product ({
            imageUrl: reqBody.imageUrl,
            productName: reqBody.productName,
            description: reqBody.description,
            prodPrice: reqBody.prodPrice,
            prodQuantity: reqBody.prodQuantity   
        })

            return newProduct.save().then((product, error) =>{
                if (error) {
                    return false
                }
                else{
                    return true
                }
            })           
        }


// Getting all active products

module.exports.getActiveProducts = () => {
    return Product.find({isActive: true}).then(result => result);
}


module.exports.getProducts = () => {
    return Product.find({}).then(result => result);
}



// Getting single product using Object id

module.exports.getSingleProduct = (productId) => {
    return Product.findById(productId).then(result => result);
}

// Updating product with authorization

module.exports.updateProduct = (productId, reqBody) => {

    let updatedProduct = {
        imageUrl: reqBody.imageUrl,
        productName: reqBody.productName,
        description: reqBody.description,
        prodPrice: reqBody.prodPrice,
        prodQuantity: reqBody.prodQuantity
    }

    return Product.findByIdAndUpdate(productId, updatedProduct).then((productUpdate, error) =>{
        if (error) {
            return false;
        }
        else{
            return true;
        }
    })
}


// Archive a product

module.exports.archiveProduct = (productId, reqBody) => {
    let archiveProductField = {
        isActive: reqBody.isActive
    }
    return Product.findByIdAndUpdate(productId, archiveProductField).then((isActive, error) =>{
        if (error) {
            // Product is not archived
            return false
        }
        else{
            // Product archived successfully
            return true
        }
    })
}


//controller to delete a single product
module.exports.deleteProduct = (productId, reqBody) => {
    let productDelete = {productId: reqBody.productId}

    return Product.findByIdAndDelete(productId, productDelete).then((productId, error) =>{
        if (error) {
            return false
        }
        else{
            return true
        }
    })
}








