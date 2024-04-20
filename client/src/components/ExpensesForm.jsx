import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  useTheme,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  useSaveExpensesMutation,
  useGetAllCategoriesQuery,
  useGetAllEventsQuery,
} from "state/api";
import { toast } from "react-toastify";

const ExpensesForm = ({
  psychoTypesData,
  psychoTypesLoading,
  psychoTypesError,
}) => {
  const moods = ["neutral", "happy", "regretful"];

  const theme = useTheme();
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState(0);
  const [categoryCode, setCategoryCode] = useState("");
  const [dateTime, setDateTime] = useState(new Date());
  const [event, setEvent] = useState("");
  const [psychologicalTypeCode, setPsychologicalTypeCode] = useState("");
  const [description, setDescription] = useState("");
  //   const [notes, setNotes] = useState("");
  //   const [image, setImage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [mood, setMood] = useState(moods[0]);
  //   const [goalId, setGoalId] = useState("");

  const [saveExpenses, { isLoading, isError }] = useSaveExpensesMutation();
  const {
    data: userEvents,
    isLoading: isLoadingEvents,
    isError: eventsError,
  } = useGetAllEventsQuery();
  //   console.log(JSON.parse(localStorage.getItem("tokenExpensio")));

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useGetAllCategoriesQuery();

  const handleCategoryChange = (event) => {
    setCategoryCode(event.target.value);
  };
  const handleSubmit = async () => {
    try {
      const response = await saveExpenses({
        title,
        amount,
        categoryCode,
        dateTime,
        event,
        psychologicalTypeCode,
        description,
        paymentMethod,
        mood,
      });
      // Check if the mutation is successful
      if (response.data) {
        // If successful, display success notification
        toast.success("Expense added successfully!");
        setAmount(0);
        setTitle("");
        setCategoryCode("");
        setDateTime("");
        setEvent("");
        setPsychologicalTypeCode("");
        setDescription("");
        setPaymentMethod("");
        setMood("");
      } else {
        // If not successful, display error notification
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
        Add Expense
      </Typography>
      <Box mt={3}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              sx={{ ...backgroundColorStyle }}
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ ...backgroundColorStyle }}
              label="Amount"
              variant="outlined"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="category-label">Category</InputLabel>
              <Select
                sx={{ ...backgroundColorStyle }}
                labelId="category-label"
                value={categoryCode}
                onChange={handleCategoryChange}
                label="Category"
              >
                {categoriesLoading ? (
                  <MenuItem disabled>Loading categories...</MenuItem>
                ) : (
                  categoriesData?.categories?.map((category) => (
                    <MenuItem key={category.code} value={category.code}>
                      {category.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ ...backgroundColorStyle }}
              label="Date & Time"
              variant="outlined"
              type="datetime-local"
              value={dateTime}
              onChange={(e) => setDateTime(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="event-label">Events</InputLabel>
              <Select
                sx={{ ...backgroundColorStyle }}
                labelId="event-label2"
                value={event._id}
                onChange={(e) => setEvent(e.target.value)}
                label="Event"
              >
                {isLoadingEvents ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : (
                  userEvents?.events?.map((event) => (
                    <MenuItem key={event._id} value={event._id}>
                      {event.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="psycho-types-label">
                Psychological Type
              </InputLabel>
              <Select
                sx={{ ...backgroundColorStyle }}
                labelId="psychologicaltype-label"
                value={psychologicalTypeCode}
                onChange={(e) => setPsychologicalTypeCode(e.target.value)}
                label="Psychological Type"
              >
                {psychoTypesLoading ? (
                  <MenuItem disabled>Loading...</MenuItem>
                ) : (
                  psychoTypesData?.psychologicalTypes?.map((psychoType) => (
                    <MenuItem key={psychoType.code} value={psychoType.code}>
                      {psychoType.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ ...backgroundColorStyle }}
              label="Description"
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
            />
          </Grid>
          {/* <Grid item xs={6}>
            <TextField
              sx={{ ...backgroundColorStyle }}
              label="Notes"
              variant="outlined"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              fullWidth
            />
          </Grid> */}
          {/* <Grid item xs={6}>
            <TextField
              sx={{ ...backgroundColorStyle }}
              label="Image"
              variant="outlined"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              fullWidth
            />
          </Grid> */}
          <Grid item xs={6}>
            <TextField
              sx={{ ...backgroundColorStyle }}
              label="Payment Method"
              variant="outlined"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="mood-label">Mood after transaction</InputLabel>
              <Select
                sx={{ ...backgroundColorStyle }}
                labelId="mood-label2"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                label="Mood"
              >
                {moods.map((mood_) => (
                  <MenuItem
                    key={mood_}
                    value={mood_}
                    label={mood_.charAt(0).toUpperCase() + mood_.slice(1)}
                  >
                    {mood_.charAt(0).toUpperCase() + mood_.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* <Grid item xs={6}>
            <TextField
              sx={{ ...backgroundColorStyle }}
              label="Goal ID"
              variant="outlined"
              value={goalId}
              onChange={(e) => setGoalId(e.target.value)}
              fullWidth
            />
          </Grid> */}
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

export default ExpensesForm;
