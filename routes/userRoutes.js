const express = require("express");
const router = express.Router();

const userControllers = require("../Controllers/userControllers");

const auth = require("../auth");


// Route for checking if the email exists
router.post("/checkEmail", (req, res) =>{
	userControllers.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController));
});


//Route for registrarion
router.post("/signup", (req, res) =>{
		userControllers.userSignup(req.body).then(resultFromController => res.send(resultFromController));	
});

// router for login with JWT

router.post("/login", (req, res) =>{
	userControllers.userLogin(req.body).then(resultFromController => res.send(resultFromController));
})


// route for user details
router.get("/details", auth.verify, (req, res) =>{
	const userData = auth.decode(req.headers.authorization); //contains the token
	console.log(userData);

	userControllers.getProfile({userId: userData.id}).then(resultFromController => res.send(
		resultFromController));
})

// Route for retrieving all the data users
router.get("/allUsers", auth.verify,(req, res) =>{
	courseControllers.getAllUsers().then(resultFromController => res.send(resultFromController));
	
})

//route for administrators

router.get("/administrators", auth.verify,(req, res) =>{
	const administrator = auth.decode(req.headers.authorization)

	let data = {
		userId: administrator.id
	}

	if (administrator.isAdmin == true) {
		userControllers.administrators(data).then(resultFromController => res.send(resultFromController));
	}
	else{	
		return false
	}
})



// Route to SET User as ADMIN
router.patch("/setAdmin/:id", auth.verify, (req, res) => {
	const userDataAdmin = auth.decode(req.headers.authorization);

	if (userDataAdmin.isAdmin !== true) {
		
		res.send(`You don't have any access on this page`)
	}
	else{
		userId = req.params.id;
		if (userId.length === 24) {
			userControllers.setUserAsAdmin(req.params.id).then(resultFromController => res.send(resultFromController));
		}
		else{
			return false
		}
	}
})

// Route to SET ADMIN as User
router.patch("/setAsUser/:id", auth.verify, (req, res) => {
	const adminAsUser = auth.decode(req.headers.authorization);

	if (adminAsUser.isAdmin !== true) {
		
		res.send(`You don't have any access on this page`)
	}
	else{
		userId = req.params.id;
		if (userId.length === 24) {
			userControllers.setAdminAsUser(req.params.id).then(resultFromController => res.send(resultFromController));
		}
		else{
			return false
		}
	}
})


// Route for user checkOut

router.post("/checkout", auth.verify, (req, res) =>{
	const userData = auth.decode(req.headers.authorization)

	let data = {
		userId: userData.id,
		productId: req.body.productId,
		
	}
	if (userData.isAdmin !== true) {
		res.send(false)
	}
	else{
		userControllers.checkOut(data).then(resultFromController => res.send(resultFromController));
	}
})


// Route to buy a product
router.post("/orders", auth.verify, (req, res)=>{
	const userLogin = auth.decode(req.headers.authorization)

	let data = {
		userId: userLogin.id,	
		productId: req.body.productId,
		quantity: req.body.quantity
	}

	if (userLogin.isAdmin) {

		res.send(false)
	}
	else{		
		userControllers.orders(data).then(resultFromController => res.send(resultFromController));
	}

})

// Route to check orders
router.get("/myorders", auth.verify, (req, res)=>{
	const userLogin = auth.decode(req.headers.authorization)

	let data = {
		userId: userLogin.id,
		productId: req.body.productId
	}

	if (userLogin.isAdmin !== false) {
		res.send(false)
	}
	else{
		userControllers.userOrder(data).then(resultFromController => res.send(resultFromController));
	}

})


// Route to retrieve all orders 

router.get("/allOrders", auth.verify, (req, res)=>{
	const userLogin = auth.decode(req.headers.authorization)

	let data = {
		userId: userLogin.id
	}

	if (userLogin.isAdmin) {
		userControllers.allUserOrders(data).then(resultFromController => res.send(resultFromController));
	}
	else{	
		res.send(false)
	}

})



// Route for single user order
router.get("/orders/:userId", auth.verify, (req, res)=>{
	const userLogin = auth.decode(req.headers.authorization)
	let data = {
		adminId: userLogin.id,
		userId: req.params.userId
	}		
		userControllers.singleUserOrder(data).then(resultFromController => res.send(resultFromController));

})


//Route for the user update

router.put("/update/:userId", (req, res) =>{

	userControllers.updateUser(req.params.userId, req.body).then(resultFromController => res.send(resultFromController));

})


//Route for deleting user 
router.delete("/:userId", (req, res) =>{
	userControllers.deleteUser(req.params.userId, req.body).then(resultFromController => res.send(resultFromController));
})





module.exports = router;

