import React, { useState } from 'react';
import FlexBetween from 'components/FlexBetween';
import { Box, Button, useTheme, Card, CardContent, Typography } from '@mui/material';
import Header from 'components/Header';
import { useGetExpensesByIdQuery } from 'state/api';

const ExpenseScreen = () => {
  const theme = useTheme();
  const [expenses, setExpenses] = useState([]);
  const {
    data: expense,
    isLoading: isLoadingEvents,
    isError: eventsError,
  } = useGetExpensesByIdQuery();
  
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Expense List" subtitle="Keep track of your finances." />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            EXPENSIO
          </Button>
        </Box>
      </FlexBetween>
  
      <Box mt={4} display="flex" flexWrap="wrap" gap={2}>
        {expenses?.map((expense, index) => (
          <Card key={index} sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h5" component="div">
                {expense.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Amount: {expense.amount}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Mood: {expense.mood}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Date: {expense.date}
              </Typography>
              <Typography variant="body2">
                Type: {expense.type}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ExpenseScreen;