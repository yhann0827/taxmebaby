import React, { useState } from "react";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Box,
	Typography,
	Stack,
	IconButton,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { invoiceItems } from "../utils/dummyData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReceipt } from "@fortawesome/free-solid-svg-icons";
import InvoiceReceiptDialog from "./InvoiceReceiptDialog";

// Sample data based on your previous input

const InvoiceLabeledAccordian = () => {
	const [openInvoiceDialog, setOpenInvoiceDialog] = useState({
		open: false,
		invoice: null,
	});
	return (
		<>
			<Box sx={{ mt: 2 }}>
				{invoiceItems.map((invoice, index) => {
					return (
						<Stack key={`invoice${index}`}>
							<Stack sx={{ background: "#54545419", p: 1 }}>
								<Typography
									variant='body1'
									color='text.secondary'
									fontWeight={600}
								>
									{invoice.date}
								</Typography>
							</Stack>

							{invoice.invoices.map((item, index) => (
								<Accordion key={index} sx={{ boxShadow: "none", py: 2 }}>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls='panel-content'
										id='panel-header'
									>
										<Box display='flex' alignItems='center' width='100%'>
											<Box>
												<Typography variant='body1' fontWeight={500}>
													{item.title}
												</Typography>
											</Box>
											<Box flexGrow={1} />
										</Box>
									</AccordionSummary>
									<AccordionDetails>
										{item.details.map((detail, idx) => (
											<Box
												key={idx}
												display='flex'
												justifyContent='space-between'
												alignItems='center'
												py={1}
												borderBottom={
													idx < item.details.length - 1
														? "1px solid #e0e0e0"
														: ""
												}
											>
												<Box>
													<Typography variant='body2'>
														{detail.title}
													</Typography>

													<Typography variant='body2' color='text.secondary'>
														{detail.date}
													</Typography>
												</Box>
												<Stack direction='row' alignItems='center' spacing={1}>
													<Stack direction={"row"} alignItems={"center"}>
														<span>-</span>
														<Typography variant='body1' color='text.secondary'>
															{detail.amount}
														</Typography>
													</Stack>
													<IconButton
														color='secondary'
														onClick={() =>
															setOpenInvoiceDialog({
																open: true,
																invoice: detail,
															})
														}
													>
														<FontAwesomeIcon icon={faReceipt} />
													</IconButton>
												</Stack>
											</Box>
										))}
									</AccordionDetails>
								</Accordion>
							))}
						</Stack>
					);
				})}
			</Box>

			<InvoiceReceiptDialog
				openDialog={openInvoiceDialog.open}
				invoice={openInvoiceDialog.invoice}
				handleCloseDialog={() =>
					setOpenInvoiceDialog({ open: false, invoice: null })
				}
			/>
		</>
	);
};

export default InvoiceLabeledAccordian;
