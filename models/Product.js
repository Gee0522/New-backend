const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
	imageUrl:{
		type: String,
		required: [true, "Image URL is required"]
	},
	productName:{
		type: String,
		required: [true, "Product name is required"]
	},
	description:{
		type: String,
		required: [true, "Description is required"]
	},
	prodPrice:{
		type: Number,
		required: [true, "Price is required"]
	},
	prodQuantity:{
		type: Number,
		required: [true, "Product Quantity not found!"]
	},
	isActive:{
		type: Boolean,
		default: true
	},
	orderedOn:{
		type: Date,
		default: new Date()
	},
	userCheckOut:[
		{
			userId:{
				type: String,
				required:[true, "UserId is required"]
			},
			checkOutOn:{
				type: Date,
				default: new Date()
			}
		}
	]
	

})


module.exports = mongoose.model("Product", productSchema);