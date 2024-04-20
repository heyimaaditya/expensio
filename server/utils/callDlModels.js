import axios from "axios";

export const getExpenseDataFromNLPModel = async (expenseText) => {
	const url = "http://localhost:8000/api/predict";

	try {
		const response = await axios.post(url, { inputText: expenseText });
		console.log("Output from Flask API:");
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error("Error calling Flask API:");
		console.error(error);
		throw error;
	}
};
