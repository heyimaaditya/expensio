import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import { useExpenseTestQuery } from "../../state/api";

const HomeScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const [data, isLoading] = useExpenseTestQuery();

  useEffect(() => {
    // Function to extract the token and store it
    const handleAuthentication = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get("token");
      if (token) {
        localStorage.setItem("tokenExpensio", JSON.stringify(token));
        navigate("/"); // Redirect to dashboard or other internal route
      }
    };

    handleAuthentication();
  }, [location, navigate]);

  const redirectToLogin = () => {
    navigate("/login");
  };

  // const redirectToRegister = () => {
  //   navigate("/register");
  // };
  // !isLoading && console.log(data);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      to
      <h1>EXPENSIO</h1>
      <Button variant="contained" onClick={redirectToLogin}>
        Login
      </Button>
      {/* <Button variant="contained" onClick={redirectToRegister}>
        Register
      </Button> */}
    </div>
  );
};

export default HomeScreen;
