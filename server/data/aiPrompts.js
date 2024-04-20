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
event: Link the expense to a specific event (e.g., "Birthday Dinner", "Vacation").
goal: Connect the expense to a personal goal (e.g., "Self-care", "Emergency Fund", "Saving for Trip").

Error Handling:
No amount: If no clear numerical amount is found, output: "none"
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
