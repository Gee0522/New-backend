const User = require("../models/User");
const Product = require("../models/Product");
const bcrypt = require("bcrypt");
const auth = require("../auth");
const res = require("express/lib/response");
// const salt = bcrypt.genSaltSync(10)



module.exports.checkEmailExists = (reqBody) => {
	return User.find({email: reqBody.email}).then(result => {
		// result is equal to an empty array ([]);
		// if result is greater than 0, user is found/already exists.
		if(result.length > 0){
			return true;
		}
		// No duplicate email found
		else{
			return false;
		}
	});
}




//Controller for user registration
module.exports.userSignup = (reqBody) => {

	return User.find({email: reqBody.email}).then(result =>{
		if (result.length > 0) {
			console.log(`${reqBody.email} is already in database`)
			return `${reqBody.email} is already in database`
		}
		else{
			let newUser = new User({
				fullName: reqBody.fullName,
				email: reqBody.email,
				password: bcrypt.hashSync(reqBody.password, 10),
				mobileNo: reqBody.mobileNo
			})
			return newUser.save().then((user, error) =>{
				if(error){
					return false
				}
				else {
					console.log(user)
					return true
				}

			})
		}
	})
}



// Controller to update account 
module.exports.updateUser = async (userId, reqBody) => {

	
	return User.findByIdAndUpdate(userId, reqBody).then(result =>{
		console.log(result)
		
		if (result) {
			const updatedUser = new User({
				fullName: reqBody.fullName,
				email: reqBody.email,
				password: bcrypt.hashSync(reqBody.password, 10),
				mobileNo: reqBody.mobileNo
			})
			return updatedUser.save().then((user, error) =>{
				if(error){
					return false
				}
				else {
					console.log(user)
					return true
				}
			})		
		}
		else{
			return false
		}
	})
}




// Controller for user login
module.exports.userLogin = (reqBody) => {
	return User.findOne({email: reqBody.email}).then(result =>{
		//if not exist
		if (result == null) {
			return false
		}
		//If exist
		else{
			const correctPassword = bcrypt.compareSync(reqBody.password, result.password);
			//If match password
			if (correctPassword) {
				return {access: auth.createAccessToken(result)};
			}
			else{
				return false
			}
		}
	})
}

// all orders
module.exports.allUserOrders = (data) => {
    return User.find({isAdmin: false}).then(result => result);
}


//administrator view
module.exports.administrators = (data) => {
	console.log(data)
	return User.find({isAdmin: true}).then(result => result);
}




// single order
module.exports.singleUserOrder = (data) => {
	console.log(data)

    return User.findById(data.userId).then(result => result);

}


// controller for user details

module.exports.getProfile = (data) => {
	return User.findById(data.userId).then(result =>{
		result.password = "";

		return result;
	})
}


// controller for all users
module.exports.getAllUsers = () => {
	return User.find({}).then(result => result)
}


// controller for setting user as admin
module.exports.setUserAsAdmin = (id) => {
	let setAsAdmin = {
		isAdmin: true
	}

	return User.findByIdAndUpdate(id, setAsAdmin).then((result, error) =>{
		if (error) {
			return false
		}
		else{
			return true
		}
	})
}


//Set Admin as user
module.exports.setAdminAsUser = (id) => {
	let setAsUser = {
		isAdmin: false
	}

	return User.findByIdAndUpdate(id, setAsUser).then((result, error) =>{
		if (error) {
			return false
		}
		else{
			return true
		}
	})
}



// Controller for users orders
module.exports.userOrder = (data) => {
	return User.findById(data.userId).then(result => result)
};


// controller for buying products
module.exports.orders = async (data) =>{
		
		//true or false										//result
	let isUserUpdated = await User.findById(data.userId).then(user =>{
		// Add the productId in the user's cartItem array
		user.cartItem.push({productId: data.productId, quantity: data.quantity})

		// Saves the updated user information in the database.
		return user.save().then((cartItem, error)=>{
			if(error){
				return false;
			}
			else{
				return true;
			}

		})
	})

	console.log(isUserUpdated);

	let isProductUpdated = await Product.findById(data.productId).then(product =>{
		
		// Adds the userId in the course's enrollees array
		product.userCheckOut.push({userId: data.userId})

		// Minus the slots available by 1
		
		product.prodQuantity -= data.quantity;

		// Saves the updated product information in the database
		return product.save().then((userCheckOut, error) =>{
			if(error){
				return false;
			}
			else{
				return true;
			}
		})
	})

	console.log(isProductUpdated);

	// Condition that will check if the user and product documents have been updated.
	// User enrollment successful
	if(isUserUpdated && isProductUpdated){
		return true;
	}
	// User enrollment failure
	else{
		return false;
	}
}


// controller to delete a user
module.exports.deleteUser = (userId, reqBody) => {
    let userDelete = {userId: reqBody.userId}

    return User.findByIdAndDelete(userId, userDelete).then((userId, error) =>{
        if (error) {
            return false
        }
        else{
            return true
        }
    })
}















