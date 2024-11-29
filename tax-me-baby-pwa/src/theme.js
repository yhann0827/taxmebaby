import { createTheme } from "@mui/material/styles";

const theme = createTheme({
	palette: {
		primary: {
			main: "#2fa93a", // Primary color
		},
		secondary: {
			main: "#ffa51e", // Secondary color
		},
		background: {
			default: "#f9f9f9ff", // Background color
		},
		success: {
			main: "#66bb6a", // Slightly brighter green
		},
		error: {
			main: "#de6565", // Slightly brighter red (danger)
		},
		info: {
			main: "#64b5f6", // Slightly brighter blue
		},
		warning: {
			main: "#f6b52a", // Slightly brighter blue
		},
	},
	typography: {
		fontFamily: "Roboto, Arial, sans-serif", // Font settings
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					// Override primary button text color to white
					color: "#fff", // Set the text color of all buttons to white
				},
				containedPrimary: {
					// If you want to customize the primary contained button specifically
					color: "#fff", // Primary button text will be white
				},
			},
		},
	},
});

export default theme;
