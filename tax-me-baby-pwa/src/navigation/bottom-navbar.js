import {
	faCalendar,
	faHome,
	faReceipt,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { routes } from "../App";

const BottomNavbar = ({ navigationTab, setNavigationTab }) => {
	const navigate = useNavigate();

	return (
		<Paper
			sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
			elevation={3}
		>
			<BottomNavigation
				showLabels
				value={navigationTab}
				onChange={(event, newValue) => {
					setNavigationTab(newValue);
					switch (newValue) {
						case 0:
							navigate(routes.DASHBOARD);
							break;
						case 1:
							navigate(routes.PLANNING);
							break;
						case 2:
							navigate(routes.INVOICE);
							break;
						case 3:
							navigate(routes.ACCOUNT);
							break;
						default:
							break;
					}
				}}
			>
				<BottomNavigationAction
					label='Home'
					icon={<FontAwesomeIcon icon={faHome} size='2x' />}
				/>
				<BottomNavigationAction
					label='Planning'
					icon={<FontAwesomeIcon icon={faCalendar} size='2x' />}
				/>
				<BottomNavigationAction
					label='Invoice'
					icon={<FontAwesomeIcon icon={faReceipt} size='2x' />}
				/>
				<BottomNavigationAction
					label='Account'
					icon={<FontAwesomeIcon icon={faUser} size='2x' />}
				/>
			</BottomNavigation>
		</Paper>
	);
};

export default BottomNavbar;
