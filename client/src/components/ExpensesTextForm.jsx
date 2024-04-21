import React, { useState, useEffect } from "react";
import {
	Box,
	Typography,
	TextField,
	Button,
	Grid,
	CircularProgress,
	IconButton,
	useTheme,
} from "@mui/material";
import { useSaveExpensesThroughTextMutation } from "state/api";
import { toast } from "react-toastify";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import SpeechRecognition, {
	useSpeechRecognition,
} from "react-speech-recognition";

const ExpensesTextForm = () => {
	const theme = useTheme();
	const [inputText, setInputText] = useState("");
	const [recording, setRecording] = useState(false);
	const [lastTranscriptLength, setLastTranscriptLength] = useState(0);
	const [saveExpensesThroughText, { isLoading, isError }] =
		useSaveExpensesThroughTextMutation();

	const startListening = () =>
		SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
	const { transcript, browserSupportsSpeechRecognition } =
		useSpeechRecognition();

	useEffect(() => {
		if (transcript.length > lastTranscriptLength) {
			setInputText(
				(prevInputText) =>
					prevInputText + transcript.slice(lastTranscriptLength)
			);
			setLastTranscriptLength(transcript.length);
		}
	}, [transcript, lastTranscriptLength]);

	if (!browserSupportsSpeechRecognition) {
		return null;
	}

	const handleStartRecording = () => {
		setRecording(true);
		startListening();
	};

	const handleStopRecording = () => {
		setRecording(false);
		SpeechRecognition.stopListening();
	};

	const handleSubmit = async () => {
		try {
			const response = await saveExpensesThroughText({
				expenseText: inputText,
			});
			if (response.data) {
				toast.success("Expense added successfully!");
				setInputText("");
			} else {
				toast.error("Failed to add expense. Please try again.");
			}
		} catch (error) {
			console.error("Error saving expense:", error);
			toast.error("Failed to add expense. Please try again.");
		}
	};

	const backgroundColorStyle = {
		backgroundColor: theme.palette.background.default,
	};

	return (
		<>
			<Typography
				variant="h3"
				sx={{ color: theme.palette.secondary[100], fontWeight: "bold" }}
			>
				Add Expense just by Writing Text or Speaking!
			</Typography>
			<Box mt={3}>
				<Grid container spacing={2} alignItems="center">
					<Grid item xs={11}>
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
					<Grid item xs={1}>
						<IconButton
							onClick={recording ? handleStopRecording : handleStartRecording}
							color="primary"
						>
							{recording ? (
								<MicOffIcon fontSize="large" />
							) : (
								<MicIcon fontSize="large" />
							)}
						</IconButton>
					</Grid>
				</Grid>
			</Box>
			<Button
				variant="outlined"
				color="secondary"
				onClick={handleSubmit}
				disabled={isLoading}
				sx={{ mt: 4, fontSize: 15, p: 2, paddingInline: 4 }}
			>
				{isLoading ? <CircularProgress size={24} /> : "Upload Data"}
			</Button>
			{isError && (
				<Typography variant="body1" color="error" sx={{ mt: 2 }}>
					Error uploading data. Please try again.
				</Typography>
			)}
		</>
	);
};

export default ExpensesTextForm;
