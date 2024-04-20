import axios from "axios";

export const openaiApi = async function getOpenAIResponse(userPrompt) {
	const url = "https://api.openai.com/v1/chat/completions";
	const headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
	};
	const data = {
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "system",
				content: "You are a helpful assistant.",
			},
			{
				role: "user",
				content: userPrompt,
			},
		],
		max_tokens: 1000,
	};

	try {
		const response = await axios.post(url, data, { headers: headers });
		const output = response.data.choices[0].message.content.trim();
		return JSON.parse(output);
	} catch (error) {
		console.error("API request failed:", error);
		throw new Error("Failed to fetch response from OpenAI API");
	}
};

export const openaiApiSummary = async function getOpenAIResponse(userPrompt) {
	const url = "https://api.openai.com/v1/chat/completions";
	const headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
	};
	const data = {
		model: "gpt-3.5-turbo",
		messages: [
			{
				role: "system",
				content: "You are a helpful assistant.",
			},
			{
				role: "user",
				content: userPrompt,
			},
		],
		max_tokens: 1000,
		temperature: 0.8,
	};

	try {
		const response = await axios.post(url, data, { headers: headers });
		const stringOutput = response.data.choices[0].message.content.trim();
		return stringOutput;
	} catch (error) {
		console.error("API request failed:", error);
		throw new Error("Failed to fetch response from OpenAI API");
	}
};
