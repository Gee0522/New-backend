const jwt = require("jsonwebtoken");
const User = require("./models/User");
const bcrypt = require('bcrypt');
const secret = "mySecreteCode";


module.exports.createAccessToken = (user) => {

	const data = {
		id: user._id,
		email: user.email,
		isAdmin: user.isAdmin
	}

	return jwt.sign(data, secret, {})
}



module.exports.verify = (req, res, next) => {
	let token = req.headers.authorization;
	console.log(typeof token);

	if (typeof token !== "undefined") {
		// console.log(token);
		token = token.slice(7, token.length);//This removes the "Bearer" prefix and obtains only the token for verification.
		console.log(token)

		return jwt.verify(token, secret, (error, data) =>{
			if (error) {
				return res.send({auth: "Invalid token!"})
			}
			else{
				next();
			}
		})

	}
	else{
		return res.send({auth: "You're not authorized!"});
	}	
}

module.exports.decode = (token) => {

	if(typeof token !== "undefined"){
		token = token.slice(7, token.length);
		return jwt.verify(token, secret, (error, data)=>{
			if(error){
				return null;
			}
			else{
				return jwt.decode(token, {complete: true}).payload;
			}
		})
	}
	else{
		return null;
	}

}

