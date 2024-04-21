export const textExpensePrompt = `Task: Analyze short expense-related text and extract the following information, providing context and understanding potential emotional undertones.
Input at last, after the **** sign.
Example 1: "Treated myself to a facial at the spa for some self-care. The indulgence cost Rs 1499 for a luxury treatment."
Example 2: "Ugh, had to replace my broken phone screen - that set me back $250."
Example 3: "Birthday dinner with Sarah cost $80, but worth it for the celebration."
Output Format: Stringified JSON

Mandatory Keys:
title: Short, descriptive title for the expense (e.g., "Spa Facial", "Phone Repair")
amount: Numerical expense amount, include currency symbol if possible. IT HAS TO BE A NUMBER ONLY.
mood: Inferred emotional state (happy, neutral, regretful). Consider keywords and overall sentiment.

Optional Keys (Include ONLY if clearly applicable):
description: Additional context or explanation provided in the text.

Error Handling:
No amount: If no clear numerical amount is found, output: a stringified JSON with one key value pair as "answer":"none"
Ambiguous mood: If the emotional state is difficult to determine, default to "neutral."
Desired JSON Examples:

Example 1:
JSON
{
    "title": "Spa Facial",
    "amount":  1499,
    "mood": "happy",
    "description": "The indulgence cost Rs 1499 for a luxury treatment",
    "goal": "Self-care"   
}
Example 2:
JSON
{ 
    "title": "Phone Repair", 
    "amount": 250,
    "mood": "regretful" 
} 
****`;

export const userSummaryPrompt = `I am building a expense tracker app that helps find user find their relationship with money. So according to the expense data that I receive,

I want to generate the summary for the user's relationship with money according to the number of transactions done in various psychologicalTypes and categories, total expenses, number of expenses. Return a .md file only, MAKE IT VERY SURE TO WRITE NOTHING ELSE. If there is no/inadequate data, mention it and in that case don't generate a detailed file but otherwise generate a very detailed motivating, and in depth report.

Please use any books AND research papers you can find about people and money, and generate me a summary of the person's strengths, where he needs to improve and what new he should do in order to be wealthy, and some details about their personality according to the data. 

carefully mention all the books, online articles and research papers you use to build the summary.

Psychological Types
Mindful Spending: Planned, aligns with goals, considered (rent, savings contribution, necessary item after research).
Impulse Buy: Unplanned, driven by immediate desire, potential for later regret (couldn't resist a sale, stress-induced retail therapy).
Essential Need: Non-negotiable for basic well-being (core groceries, housing, healthcare, debt minimums).
Routine Expense: Recurring, often smaller amounts that can become unconscious (subscriptions, daily takeout).
Social Outlay: Driven by a desire to connect or belong (events with friends, gifts beyond obligation, "keeping up" purchases).
Experiential Investment: Prioritizes memories and self-growth (travel, courses, enriching activities).
Emotional Comfort: Spending to soothe negative feelings or fill a void (comfort food, retail therapy, distraction purchases).
Aspiration Focused: Reflects future goals and values (saving for a dream trip, quality items over disposable trends).

Categories 
Groceries and Dining, bills & Utilities, personal care, entertainment, transportation, housing, healthcare, financial services, others
No need to specify the Financial Data Raw, merge some of it beautifully within sentences. The currency to be used is Rupee
NOTE::: FinancialData given in JSON.stringify format after **** 
`;
