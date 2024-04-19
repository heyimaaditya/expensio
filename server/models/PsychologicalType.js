import mongoose from "mongoose";

const psychologicalTypeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		maxlength: 50,
	},
	code: {
		type: String,
		required: true,
		maxlength: 80,
		validate: {
			validator: function (v) {
				return !/\s/.test(v);
			},
			message: (props) => `${props.value} should not contain spaces`,
		},
	},
	description: {
		type: String,
		maxlength: 1000,
	},
});

const PsychologicalType = mongoose.model(
	"PsychologicalType",
	psychologicalTypeSchema
);

export default PsychologicalType;
