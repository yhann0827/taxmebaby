import { AppBar, Container, Stack, Typography } from "@mui/material";
import BottomNavbar from "../navigation/bottom-navbar";

const PageLayout = ({ children, title, navigationTab, setNavigationTab }) => {
	return (
		<Stack sx={{ pb: 9 }}>
			<AppBar
				position='static'
				elevation={0}
				sx={{ py: 2, mb: 2, background: "#ffffff" }}
			>
				<Typography
					textAlign={"center"}
					variant='h5'
					fontWeight={600}
					color='text.secondary'
				>
					{title}
				</Typography>
			</AppBar>
			<Container>{children}</Container>
			<BottomNavbar
				navigationTab={navigationTab}
				setNavigationTab={setNavigationTab}
			/>
		</Stack>
	);
};

export default PageLayout;
