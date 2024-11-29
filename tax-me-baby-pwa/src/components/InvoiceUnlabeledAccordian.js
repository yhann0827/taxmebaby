import React, { useState } from "react";
import { Box, Typography, Stack, IconButton } from "@mui/material";
import { bankTransactions } from "../utils/dummyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useDropzone } from "react-dropzone"; // Import react-dropzone
import InvoiceReceiptDialog from "./InvoiceReceiptDialog";

const InvoiceUnlabeledAccordian = () => {
	const [openInvoiceDialog, setOpenInvoiceDialog] = useState({
		open: false,
		invoice: null,
	});
	const [image, setImage] = useState(null); // Store the uploaded or captured image

	// Handle file upload or camera trigger
	const onDrop = (acceptedFiles) => {
		const file = acceptedFiles[0];
		if (file) {
			setImage(URL.createObjectURL(file)); // Create an object URL for the uploaded image
			setOpenInvoiceDialog({
				open: true,
				invoice: [
					{
						title: "256810510 DRINKS BAR",
						amount: "RM250",
					},
					{
						title: "SALES DEBIT AEON",
						amount: "RM1500",
					},
					{
						title: "DUITNOW MBB CT MR KEAT",
						amount: "RM5000",
					},
				],
			});
		}
	};

	// Setup react-dropzone for file upload
	const { getRootProps, getInputProps } = useDropzone({
		onDrop, // Handle file drop or camera trigger
		accept: "image/*", // Only accept image files
	});

	return (
		<>
			<Box sx={{ mt: 2 }}>
				{bankTransactions.map((transaction, index) => {
					return (
						<Stack key={`transaction${index}`}>
							<Stack sx={{ background: "#54545419", p: 1 }}>
								<Typography
									variant='body1'
									color='text.secondary'
									fontWeight={600}
								>
									{transaction.date}
								</Typography>
							</Stack>

							<Box sx={{ pl: 1 }}>
								{transaction.invoices.map((detail, idx) => (
									<Box
										key={idx}
										display='flex'
										justifyContent='space-between'
										alignItems='center'
										py={1}
										borderBottom={
											idx < transaction.length - 1 ? "1px solid #e0e0e0" : ""
										}
									>
										<Box>
											<Typography variant='body2'>{detail.title}</Typography>
										</Box>
										<Stack direction='row' alignItems='center' spacing={1}>
											<Stack direction={"row"} alignItems={"center"}>
												<span>-</span>
												<Typography variant='body1' color='text.secondary'>
													{detail.amount}
												</Typography>
											</Stack>
											<IconButton
												{...getRootProps()}
												sx={{ color: "#8c8c8cca" }}
												// onClick={handleCamera} // Open camera when clicked
											>
												<FontAwesomeIcon icon={faCamera} />
											</IconButton>
										</Stack>
									</Box>
								))}
							</Box>
						</Stack>
					);
				})}
			</Box>

			{/* Dropzone for file upload (hidden, but can be triggered programmatically) */}
			<div {...getRootProps()} style={{ display: "none" }}>
				<input {...getInputProps()} />
			</div>

			<InvoiceReceiptDialog
				openDialog={openInvoiceDialog.open}
				invoice={openInvoiceDialog.invoice}
				handleCloseDialog={() =>
					setOpenInvoiceDialog({ open: false, invoice: null })
				}
				image={image} // Pass the image to dialog
			/>
		</>
	);
};

export default InvoiceUnlabeledAccordian;
