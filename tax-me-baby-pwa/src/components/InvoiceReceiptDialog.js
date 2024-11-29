import {
	faDownload,
	faRefresh,
	faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Box,
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Stack,
	Typography,
} from "@mui/material";
import { receiptDetails } from "../utils/dummyData";

const InvoiceReceiptDialog = ({
	image,
	invoice,
	openDialog,
	handleCloseDialog,
}) => {
	return (
		<Dialog fullScreen fullWidth open={openDialog} onClose={handleCloseDialog}>
			<DialogTitle>
				<Stack
					direction={"row"}
					justifyContent={"space-between"}
					alignItems={"center"}
				>
					{invoice?.title}
					<IconButton onClick={handleCloseDialog}>
						<FontAwesomeIcon icon={faXmark} />
					</IconButton>
				</Stack>
			</DialogTitle>
			<DialogContent>
				<Stack alignItems={"center"}>
					<Box>
						<img
							alt={invoice?.imgUrl}
							src={image ?? invoice?.imgUrl}
							width='250px'
							height='400px'
						/>
					</Box>
					<Stack
						width='100%'
						direction={"row"}
						alignItems='center'
						justifyContent={"space-between"}
					>
						<Button
							variant='contained'
							color='secondary'
							sx={{
								borderRadius: "50%",
								width: "50px",
								height: "50px",
								minWidth: "50px",
							}}
						>
							<FontAwesomeIcon size='xl' icon={faRefresh} />
						</Button>
						<Button
							variant='contained'
							sx={{
								borderRadius: "50%",
								width: "50px",
								height: "50px",
								minWidth: "50px",
							}}
						>
							<FontAwesomeIcon size='xl' icon={faDownload} />
						</Button>
					</Stack>
				</Stack>

				<Stack sx={{ mt: 2 }}>
					<Stack sx={{ background: "#54545419", p: 1 }}>
						<Typography variant='body1' color='text.secondary' fontWeight={600}>
							Receipt Details
						</Typography>
					</Stack>
					<Box sx={{ pl: 1, mt: 1 }}>
						{receiptDetails.map((child, index) => {
							return (
								<>
									<Stack
										direction='row'
										alignItems='center'
										justifyContent={"space-between"}
										key={`receipt_details_${index}`}
										sx={{ py: 2 }}
									>
										<Typography>{child.title}</Typography>
										<Typography>{child.amount}</Typography>
									</Stack>
									{receiptDetails.length - 1 !== index && <Divider />}
								</>
							);
						})}
					</Box>
				</Stack>
			</DialogContent>
		</Dialog>
	);
};

export default InvoiceReceiptDialog;
