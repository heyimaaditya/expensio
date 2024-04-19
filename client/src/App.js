import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./scenes/login";
// import Register from "./scenes/register";
import { CssBaseline, ThemeProvider } from "@mui/material";

// import "./App.css";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { themeSettings } from "./theme";

import HomeScreen from "./scenes/homescreen";
import Dashboard from "./scenes/dashboard";
import PrivateRoute from "components/PrivateRoute";
import Layout from "scenes/layout";

function App() {
	const mode = useSelector((state) => state.global.mode);
	const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
	return (
		<BrowserRouter>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<ToastContainer />

				<Routes>
					<Route path="" element={<PrivateRoute />}>
						<Route element={<Layout />}>
							{" "}
							{/* will exist on every page. Eg, navbar and sidebar. */}
							{/* general */}
							<Route path="/dashboard" element={<Dashboard />} />
						</Route>
					</Route>

					<Route>
						<Route index path="/" element={<HomeScreen />} />

						<Route path="/login" element={<Login />} />
						{/* <Route path="/register" element={<Register />} /> */}
					</Route>
				</Routes>
			</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
