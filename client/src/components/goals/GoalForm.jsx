import React, { useState } from "react";
import {
	Box,
	Button,
	TextField,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
	Typography,
	Grid,
	useTheme,
	CircularProgress,
} from "@mui/material";
import { useSaveGoalMutation } from "state/api";
import { toast } from "react-toastify";

const GoalsForm = () => {
	const theme = useTheme();
	const backgroundColorStyle = {
		backgroundColor: theme.palette.background.paper,
		borderRadius: theme.shape.borderRadius,
	};

	const [goal, setGoal] = useState({
		name: "",
		description: "",
		maxSpend: "",
		minIncome: "",
		type: "",
		startDate: new Date(),
		endDate: new Date(),
		priority: "medium",
	});
	const [saveGoal, { isLoading, isError }] = useSaveGoalMutation();

	const handleChange = (event) => {
		setGoal({ ...goal, [event.target.name]: event.target.value });
	};

	const handleSubmit = async () => {
		try {
			const response = await saveGoal({
				name: goal.name,
				description: goal.description !== "" ? goal.description : null,
				maxSpend: goal.maxSpend ? goal.maxSpend : 0,
				minIncome: goal.minIncome ? goal.minIncome : 0,
				type: goal.type,
				startDate: goal.startDate,
				endDate: goal.endDate,
				priority: goal.priority,
			});
			// Check if the mutation is successful
			if (response.data) {
				toast.success("Goal added successfully!");
				setGoal({
					...goal,
					name: "",
					description: "",
					maxSpend: "",
					minIncome: "",
					type: "",
					startDate: new Date(),
					endDate: new Date(),
					priority: "medium",
				});
			} else {
				// If not successful, display error notification
				toast.error("Failed to add goal. Please try again.");
			}
		} catch (error) {
			// If an error is caught, display error notification
			console.error("Error saving goal:", error);
			toast.error("Failed to add goal. Please try again.");
		}
	};

	return (
		<Box mt={3} px={2}>
			<Typography
				variant="h3"
				sx={{ color: theme.palette.secondary.main, fontWeight: "bold" }}
			>
				Add New Goal
			</Typography>
			{/* <Box component="form" onSubmit={handleSubmit} noValidate> */}
			<Box mt={3}>
				<Grid container spacing={2}>
					<Grid item xs={12} md={6}>
						<TextField
							required
							label="Goal Name"
							name="name"
							value={goal.name}
							onChange={handleChange}
							fullWidth
							sx={{ ...backgroundColorStyle }}
							variant="outlined"
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<FormControl
							fullWidth
							variant="outlined"
							sx={{ ...backgroundColorStyle }}
						>
							<InputLabel id="type-label">Goal Type</InputLabel>
							<Select
								labelId="type-label"
								id="type"
								name="type"
								value={goal.type}
								label="Goal Type"
								onChange={handleChange}
							>
								<MenuItem value="income">Income Goal</MenuItem>
								<MenuItem value="spend">Expenditure Goal</MenuItem>
								<MenuItem value="both">Hybrid Goal</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					{(goal.type === "spend" || goal.type === "both") && (
						<Grid item xs={12} md={6}>
							<TextField
								label="Allowed Maximum Spending"
								name="maxSpend"
								type="number"
								value={goal.maxSpend}
								onChange={handleChange}
								fullWidth
								sx={{ ...backgroundColorStyle }}
								variant="outlined"
							/>
						</Grid>
					)}
					{(goal.type === "income" || goal.type === "both") && (
						<Grid item xs={12} md={6}>
							<TextField
								label="Minimum Income"
								name="minIncome"
								type="number"
								value={goal.minIncome}
								onChange={handleChange}
								fullWidth
								sx={{ ...backgroundColorStyle }}
								variant="outlined"
							/>
						</Grid>
					)}

					<Grid item xs={12} md={6}>
						<FormControl
							fullWidth
							variant="outlined"
							sx={{ ...backgroundColorStyle }}
						>
							<InputLabel id="priority-label">Priority</InputLabel>
							<Select
								labelId="priority-label"
								id="priority"
								name="priority"
								value={goal.priority}
								label="Priority"
								onChange={handleChange}
							>
								<MenuItem value="low">low</MenuItem>
								<MenuItem value="medium">medium</MenuItem>
								<MenuItem value="high">high</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							id="startDate"
							label="Start Date"
							type="date"
							name="startDate"
							value={goal.startDate}
							onChange={handleChange}
							fullWidth
							sx={{ ...backgroundColorStyle }}
							InputLabelProps={{
								shrink: true,
							}}
							variant="outlined"
						/>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextField
							id="endDate"
							label="End Date"
							type="date"
							name="endDate"
							value={goal.endDate}
							onChange={handleChange}
							fullWidth
							sx={{ ...backgroundColorStyle }}
							InputLabelProps={{
								shrink: true,
							}}
							variant="outlined"
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							fullWidth
							id="description"
							label="Description"
							name="description"
							value={goal.description}
							onChange={handleChange}
							multiline
							rows={4}
							sx={{ ...backgroundColorStyle }}
							variant="outlined"
						/>
					</Grid>
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
				</Grid>
			</Box>
		</Box>
	);
};

export default GoalsForm;
