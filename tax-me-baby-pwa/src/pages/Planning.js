import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
	Box,
	Card,
	CardContent,
	Typography,
	Button,
	IconButton,
	Grid2 as Grid,
	CardActions,
	Fab,
	Tooltip,
	Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { planningInitialState } from "../utils/dummyData";
import PlanningCrudDialog from "../components/PlanningCrudDialog";

const Planning = () => {
	const [transactions, setTransactions] = useState(planningInitialState);

	const [newTransaction, setNewTransaction] = useState({
		title: "",
		category: "",
		price: "",
		date: "",
	});

	const [openDialog, setOpenDialog] = useState(false);
	const [isEditing, setIsEditing] = useState(false); // Track if we are editing an existing transaction
	const [currentTransactionId, setCurrentTransactionId] = useState(null);

	const handleAddTransaction = () => {
		if (
			newTransaction.title &&
			newTransaction.category &&
			newTransaction.price &&
			newTransaction.date
		) {
			setTransactions([...transactions, { ...newTransaction, id: uuidv4() }]);
			setNewTransaction({ title: "", category: "", price: "", date: "" });
			setOpenDialog(false); // Close the dialog after adding
		}
	};

	const handleEditTransaction = () => {
		const updatedTransactions = transactions.map((transaction) =>
			transaction.id === currentTransactionId
				? { ...transaction, ...newTransaction }
				: transaction
		);
		setTransactions(updatedTransactions);
		setOpenDialog(false); // Close the dialog after editing
		setIsEditing(false); // Reset the editing state
		setCurrentTransactionId(null); // Clear the current editing ID
	};

	const handleDeleteTransaction = (id) => {
		setTransactions(
			transactions.filter((transaction) => transaction.id !== id)
		);
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setNewTransaction((prev) => ({ ...prev, [name]: value }));
	};

	const handleOpenDialog = (transaction = null) => {
		if (transaction) {
			setNewTransaction(transaction);
			setCurrentTransactionId(transaction.id);
			setIsEditing(true);
		} else {
			setNewTransaction({ title: "", category: "", price: "", date: "" });
			setIsEditing(false);
		}
		setOpenDialog(true);
	};

	const handleCloseDialog = () => {
		setOpenDialog(false);
		setIsEditing(false);
		setCurrentTransactionId(null);
	};

	return (
		<>
			<Stack spacing={2}>
				{/* Date Selector at the top-right */}
				<Stack direction={"row"} justifyContent={"flex-end"}>
					<Button variant='contained'>
						<Stack direction='row' spacing={1}>
							<Typography variant='body2'>January 2024</Typography>
							<FontAwesomeIcon icon={faCalendar} size='lg' />
						</Stack>
					</Button>
				</Stack>

				<Grid container spacing={3} sx={{ pb: 7 }}>
					{/* Displaying the list of transactions */}
					<Grid item size={{ xs: 12 }}>
						{transactions.map((transaction) => (
							<Card
								key={transaction.id}
								sx={{
									mb: 2,

									borderRadius: "8px",
									boxShadow: "0px 4px 5px 0.8px rgba(0, 0, 0, 0.1)",
								}}
							>
								<CardContent sx={{ pb: 0 }}>
									<Box display='flex' justifyContent='space-between'>
										<Box>
											<Typography variant='h6'>{transaction.title}</Typography>
											<Typography variant='body2' color='text.secondary'>
												Category: {transaction.category}
											</Typography>
											<Typography variant='body2' color='text.secondary'>
												Recommended Purchase Date: {transaction.date}
											</Typography>
										</Box>
										<Box>
											<Typography
												variant='h6'
												color='text.secondary'
												fontWeight={500}
											>
												{transaction.price}
											</Typography>
										</Box>
									</Box>
								</CardContent>
								<CardActions
									sx={{ display: "flex", justifyContent: "flex-end" }}
								>
									<Tooltip title='Edit Transaction'>
										<IconButton
											sx={{ pt: 0 }}
											onClick={(e) => {
												e.stopPropagation();
												handleOpenDialog(transaction);
											}}
											color='primary'
										>
											<EditIcon />
										</IconButton>
									</Tooltip>
									<Tooltip title='Delete Transaction'>
										<IconButton
											sx={{ pt: 0 }}
											onClick={(e) => {
												e.stopPropagation();
												handleDeleteTransaction(transaction.id);
											}}
											color='error'
										>
											<DeleteIcon />
										</IconButton>
									</Tooltip>
								</CardActions>
							</Card>
						))}
					</Grid>
				</Grid>

				{/* Floating Action Button (FAB) to open dialog for adding a new transaction */}
				<Fab
					color='primary'
					aria-label='add'
					sx={{
						position: "fixed",
						bottom: 70, // 50px from bottom
						right: 20, // Right-aligned
						color: "white",
					}}
					onClick={() => handleOpenDialog()}
				>
					<AddIcon />
				</Fab>
			</Stack>

			<PlanningCrudDialog
				openDialog={openDialog}
				handleCloseDialog={handleCloseDialog}
				isEditing={isEditing}
				newTransaction={newTransaction}
				handleInputChange={handleInputChange}
				handleEditTransaction={handleEditTransaction}
				handleAddTransaction={handleAddTransaction}
			/>
		</>
	);
};

export default Planning;
