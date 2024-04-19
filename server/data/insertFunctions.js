import Category from "../models/Category.js";
import PsychologicalType from "../models/PsychologicalType.js";

export async function addCategories() {
	const categories = [
		{
			name: "Bills & Utilities",
			code: "billsUtilities",
			description:
				"Expenses for regular utilities and bills such as electricity, water, and internet.",
			color: "lightblue",
			image: "billsUtilities.png",
			isOriginal: true,
		},
		{
			name: "Financial Services",
			code: "financialServices",
			description:
				"Banking fees, financial advising, or other financial service charges.",
			color: "gold",
			image: "financialServices.png",
			isOriginal: true,
		},
		{
			name: "Groceries & Dining",
			code: "groceriesDining",
			description: "All expenses related to food purchasing and dining out.",
			color: "green",
			image: "groceriesDining.png",
			isOriginal: true,
		},
		{
			name: "Transportation",
			code: "transportation",
			description:
				"Costs associated with travel including fuel, public transit, and vehicle maintenance.",
			color: "grey",
			image: "transportation.png",
			isOriginal: true,
		},
		{
			name: "Housing",
			code: "housing",
			description:
				"Expenses related to housing such as rent, mortgage, and home repairs.",
			color: "brown",
			image: "housing.png",
			isOriginal: true,
		},
		{
			name: "Healthcare",
			code: "healthcare",
			description:
				"Medical expenses including doctor visits, prescriptions, and hospital services.",
			color: "red",
			image: "healthcare.png",
			isOriginal: true,
		},
		{
			name: "Personal Care",
			code: "personalCare",
			description:
				"Expenses for personal care items like cosmetics, haircuts, and spa services.",
			color: "pink",
			image: "personalCare.png",
			isOriginal: true,
		},
		{
			name: "Entertainment",
			code: "entertainment",
			description:
				"Costs for activities such as movies, concerts, sports events, and other entertainments.",
			color: "purple",
			image: "entertainment.png",
			isOriginal: true,
		},
		{
			name: "Debt Payments",
			code: "debtPayments",
			description:
				"Payments made towards debts such as credit card bills, student loans, and other liabilities.",
			color: "tomato",
			image: "debtPayments.png",
			isOriginal: true,
		},
	];

	try {
		await Category.insertMany(categories);
		console.log("Categories added successfully");
	} catch (error) {
		console.error("Error adding categories to the database:", error);
	}
}

export async function addPsychologicalTypes() {
	const types = [
		{
			name: "Mindful Spending",
			code: "mindfulSpending",
			description:
				"Mindful spending involves careful consideration and planning, ensuring expenses align with personal goals. This type includes rents, savings, or necessary purchases made after thorough research.",
		},
		{
			name: "Impulse Buy",
			code: "impulseBuy",
			description:
				"Impulse buys are spontaneous and driven by immediate desires, often leading to regret. Examples include purchases made during sales or as a result of stress-induced decisions.",
		},
		{
			name: "Essential Need",
			code: "essentialNeed",
			description:
				"Essential needs are expenditures that are crucial for basic well-being and cannot be negotiated. These include fundamental groceries, housing costs, healthcare expenses, and minimum debt payments.",
		},
		{
			name: "Routine Expense",
			code: "routineExpense",
			description:
				"Routine expenses are recurrent and often in small amounts, such as monthly subscriptions or daily coffee purchases, which might not always be consciously considered.",
		},
		{
			name: "Social Outlay",
			code: "socialOutlay",
			description:
				"Social outlays are driven by the need to connect or fit in socially. This category includes spending on social events, gifts that exceed obligations, or purchases made to keep up with social circles.",
		},
		{
			name: "Experiential Investment",
			code: "experientialInvestment",
			description:
				"Experiential investments focus on creating memories and fostering personal growth, including expenditures on travel, educational courses, and other enriching activities.",
		},
		{
			name: "Emotional Comfort",
			code: "emotionalComfort",
			description:
				"Spending for emotional comfort aims to soothe negative feelings or to fill emotional voids, often including comfort foods, shopping for pleasure, or making distraction purchases.",
		},
		{
			name: "Aspiration Focused",
			code: "aspirationFocused",
			description:
				"Aspiration-focused spending is targeted towards future goals and personal values, such as saving for a significant trip or investing in high-quality, long-lasting products over cheaper, disposable options.",
		},
	];

	try {
		await PsychologicalType.insertMany(types);
		console.log("Psychological types added successfully");
	} catch (error) {
		console.error("Error adding psychological types to the database:", error);
	}
}
