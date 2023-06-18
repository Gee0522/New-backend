const express = require("express");
const router = express.Router();
const productControllers = require("../Controllers/productControllers");


const auth = require("../auth");


// Route for creating a Product

router.post("/prodCreate", auth.verify, (req, res) =>{

	const adminData = auth.decode(req.headers.authorization);

	if (adminData.isAdmin) {

		productControllers.addProduct(req.body).then(resultFromController => res.send(resultFromController));		 
	}
	else{
	 
		res.send("You don’t have permission on this page!");
	}

})


// Route for retrieving all the Products

router.get("/", (req, res) =>{
	 productControllers.getProducts().then(resultFromController => res.send(resultFromController));
})


// Route to retrieve single product

router.get("/:productId", (req, res) =>{
	console.log(req.params.productId)

	productControllers.getSingleProduct(req.params.productId).then(resultFromController => res.send(resultFromController));
})


// Route to update a product with authorization

router.put("/:productId", auth.verify, (req, res) =>{

	productControllers.updateProduct(req.params.productId, req.body).then(resultFromController => res.send(resultFromController));
})

// Route to archive a product

router.patch("/:productId/archive", auth.verify, (req, res) =>{
	productControllers.archiveProduct(req.params.productId, req.body).then(resultFromController => res.send(resultFromController));
})


// Route to delete a product
router.delete("/:productId", (req, res) =>{
	productControllers.deleteProduct(req.params.productId, req.body).then(resultFromController => res.send(resultFromController));
})








module.exports = router;
