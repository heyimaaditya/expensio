import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 150,
	},
	image: {
		type: String,
		required: true,
		maxlength: 300,
		default: "user/default.png",
	},
	email: {
		type: String,
		required: true,
		validate: {
			validator: function (v) {
				return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
			},
			message: (props) => `${props.value} is not a valid email address!`,
		},
	},
	googleId: {
		type: String,
	},
	phone: {
		type: String,
		validate: {
			validator: function (v) {
				return /^\d{7,15}$/.test(v); //phone number between 7-15 digits
			},
			message: (props) => `${props.value} is not a valid phone number!`,
		},
	},
	occupation: {
		type: String,
		maxlength: 100, // Reasonable length for occupation titles
	},
	location: {
		type: {
			type: String,
			default: "Point",
		},
		coordinates: {
			type: [Number],
			index: "2dsphere",
		},
	},
	budget: {
		type: Map,
		of: Number,
	},
	/* object with {KEY=(FKey from model category): VALUE={NUMBER}} multiple keys and values of course */
	// expenses: [
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "Expense",
	// 	},
	// ],
	// incomes: [
	// 	{
	// 		type: mongoose.Schema.Types.ObjectId,
	// 		ref: "Income",
	// 	},
	// ],
});

// virtual for full name
// userSchema.virtual("fullName").get(function () {
// 	return `${this.fname} ${this.lname}`;
// });

const User = mongoose.model("User", userSchema);

export default User;
