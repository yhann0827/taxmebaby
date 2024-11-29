import {
	TextField,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Stack,
	useTheme,
} from "@mui/material";

const PlanningCrudDialog = ({
	openDialog,
	handleCloseDialog,
	isEditing,
	newTransaction,
	handleInputChange,
	handleEditTransaction,
	handleAddTransaction,
}) => {
	const theme = useTheme();

	return (
		<Dialog
			open={openDialog}
			onClose={handleCloseDialog}
			PaperProps={{
				sx: { width: "90%" },
			}}
		>
			<DialogTitle>
				{isEditing ? "Edit Transaction" : "Add New Transaction"}
			</DialogTitle>
			<DialogContent>
				<Stack spacing={2} sx={{ py: 2 }}>
					<TextField
						fullWidth
						label='Title'
						name='title'
						value={newTransaction.title}
						onChange={handleInputChange}
						sx={{ marginBottom: 1 }}
					/>
					<TextField
						fullWidth
						label='Category'
						name='category'
						value={newTransaction.category}
						onChange={handleInputChange}
						sx={{ marginBottom: 1 }}
					/>
					<TextField
						fullWidth
						label='Price'
						name='price'
						value={newTransaction.price}
						onChange={handleInputChange}
						sx={{ marginBottom: 1 }}
					/>
					<TextField
						fullWidth
						label='Recommended Purchase Date'
						name='date'
						value={newTransaction.date}
						onChange={handleInputChange}
						sx={{ marginBottom: 2 }}
						type='date'
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Stack>
			</DialogContent>
			<DialogActions>
				<Button
					variant='outlined'
					onClick={handleCloseDialog}
					color='primary'
					sx={{ color: theme.palette.text.secondary }}
				>
					Cancel
				</Button>
				<Button
					variant='contained'
					onClick={isEditing ? handleEditTransaction : handleAddTransaction}
					color='primary'
				>
					{isEditing ? "Save Changes" : "Add Transaction"}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default PlanningCrudDialog;
