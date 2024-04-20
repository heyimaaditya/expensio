import React, { useState } from "react";
import {
	Box,
	Typography,
	TextField,
	Button,
	Grid,
	CircularProgress,
	useTheme,
} from "@mui/material";
import { useSaveExpensesThroughTextMutation } from "state/api";
import { toast } from "react-toastify";

const ExpensesTextForm = ({}) => {
	const theme = useTheme();
	const [inputText, setInputText] = useState("");

	const [saveExpensesThroughText, { isLoading, isError }] =
		useSaveExpensesThroughTextMutation({ inputText });

	const handleSubmit = async () => {
		try {
			const response = await saveExpensesThroughText({
				expenseText: inputText,
			});
			// Check if the mutation is successful
			if (response.data) {
				toast.success("Expense added successfully!");
				setInputText("");
			} else {
				toast.error("Failed to add expense. Please try again.");
			}
		} catch (error) {
			// If an error is caught, display error notification
			console.error("Error saving expense:", error);
			toast.error("Failed to add expense. Please try again.");
		}
	};

	const backgroundColorStyle = {
		backgroundColor: theme.palette.background.default,
		// fontColor: "black",
	};
	return (
		<>
			<Typography
				variant="h3"
				sx={{ color: theme.palette.secondary[100], fontWeight: "bold" }}
			>
				Add Expense just by Writing Text!
			</Typography>
			<Box mt={3}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							fullWidth
							id="inputText"
							label="Write text related to your expense here!"
							name="inputText"
							value={inputText}
							onChange={(e) => setInputText(e.target.value)}
							multiline
							rows={15}
							sx={{ ...backgroundColorStyle }}
							variant="outlined"
						/>
					</Grid>
				</Grid>
			</Box>
			<Grid item xs={12}>
				<Button
					variant="outlined"
					color="secondary"
					onClick={handleSubmit}
					disabled={isLoading}
					sx={{ mt: 4, fontSize: 15, p: 2, paddingInline: 4 }}
				>
					{isLoading ? <CircularProgress size={24} /> : "Upload Data"}
				</Button>
			</Grid>
			{isError && (
				<Typography variant="body1" color="error" sx={{ mt: 2 }}>
					Error uploading data. Please try again.
				</Typography>
			)}
		</>
	);
};

export default ExpensesTextForm;
