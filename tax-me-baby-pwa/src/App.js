import React, { useState } from "react";
// import { ThemeProvider } from "@mui/material";
import { Global } from "@emotion/react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import your pages
import Dashboard from "./pages/dashboard";
import Planning from "./pages/Planning";
import Invoice from "./pages/Invoice";
import Account from "./pages/Account";
import PageLayout from "./components/PageLayout";

// Define your routes
export const routes = {
	ROOT: "/",
	DASHBOARD: "/dashboard",
	PLANNING: "/planning",
	INVOICE: "/invoice",
	ACCOUNT: "/account",
};

const App = () => {
	const [navigationTab, setNavigationTab] = useState(0);
	return (
		<>
			<Global
				styles={{
					".center": {
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					},
				}}
			/>
			<div className='App'>
				<Routes>
					<Route
						path={routes.ROOT}
						element={<Navigate to={routes.DASHBOARD} replace />}
					/>
					<Route
						path={routes.DASHBOARD}
						element={
							<PageLayout
								navigationTab={navigationTab}
								setNavigationTab={setNavigationTab}
								title='Dashboard'
							>
								<Dashboard />
							</PageLayout>
						}
					/>
					<Route
						path={routes.PLANNING}
						element={
							<PageLayout
								navigationTab={navigationTab}
								setNavigationTab={setNavigationTab}
								title='Plan Transaction'
							>
								<Planning />
							</PageLayout>
						}
					/>
					<Route
						path={routes.INVOICE}
						element={
							<PageLayout
								navigationTab={navigationTab}
								setNavigationTab={setNavigationTab}
								title='Invoice'
							>
								<Invoice />
							</PageLayout>
						}
					/>
					<Route
						path={routes.ACCOUNT}
						element={
							<PageLayout
								navigationTab={navigationTab}
								setNavigationTab={setNavigationTab}
								title='Account'
							>
								<Account />
							</PageLayout>
						}
					/>
					<Route
						path='*'
						element={<Navigate to={routes.DASHBOARD} replace />}
					/>
				</Routes>
			</div>
		</>
	);
};

export default App;
