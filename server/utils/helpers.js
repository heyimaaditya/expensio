export function toCamelCase(str) {
	return (
		str
			// Split the string into words by spaces or underscores
			.split(/[_\s]+/)
			// Capitalize the first letter of each word except the first
			.map((word, index) => {
				if (index === 0) {
					// Lowercase the first word entirely
					return word.toLowerCase();
				}
				// Capitalize the first letter of the word and lowercase the rest
				return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
			})
			// Join all the words to form the camelCase string
			.join("")
	);
}
