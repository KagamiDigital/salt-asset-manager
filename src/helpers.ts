import * as readline from "readline";

// Create an interface for reading input from the terminal
export const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// Function to ask a question and return a promise with the answer
export function askForInput(question: string): Promise<string> {
	return new Promise((resolve) => {
		rl.question(question, (answer) => {
			resolve(answer);
		});
	});
}

export function printRectangle(mainText: string): void {
	// Parameters
	const width = 76;
	const height = 3;

	// Calculate positions for centering main text
	const mainTextLength = mainText.length;
	const mainTextX = Math.floor((width - mainTextLength) / 2);

	// Create the top border of the rectangle
	console.log("+" + "-".repeat(width - 2) + "+");

	// Print empty lines until we reach the row for the main text
	for (let i = 0; i < Math.floor((height - 3) / 2); i++) {
		console.log("|" + " ".repeat(width - 2) + "|");
	}

	// Print the main text centered
	console.log(
		"|" +
			"   " +
			"\x1b[32m" +
			mainText +
			"\x1b[0m" +
			" ".repeat(width - mainTextX - mainTextLength) +
			"|",
	);

	// Create the bottom border of the rectangle
	console.log("+" + "-".repeat(width - 2) + "+");
}
