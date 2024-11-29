import React from "react";
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Chip,
	Box,
	Typography,
	CircularProgress,
	Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { taxDeductibleListItems } from "../utils/dummyData";

// Sample data based on your previous input

const AccordionComponent = () => {
	return (
		<>
			{taxDeductibleListItems.map((item, index) => (
				<Accordion
					key={index}
					sx={{ boxShadow: "0px 4px 10px 0.8px rgba(0, 0, 0, 0.08)" }}
				>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls='panel-content'
						id='panel-header'
					>
						<Box display='flex' alignItems='center' width='100%'>
							<Box
								sx={{
									position: "relative",
									display: "inline-flex",
									marginRight: "16px",
								}}
							>
								{/* Circular Progress */}
								<Box sx={{ position: "relative", display: "inline-flex" }}>
									<CircularProgress
										sx={{ height: "100%", color: "#00000016" }}
										value={100}
										size={60}
										thickness={4}
										variant='determinate'
									/>
									<CircularProgress
										sx={{ position: "absolute", left: 0 }}
										variant='determinate'
										value={item.perct}
										size={60}
										thickness={4}
									/>
									<Box
										sx={{
											position: "absolute",
											top: "50%",
											left: "50%",
											transform: "translate(-50%, -50%)",
										}}
									>
										<Typography
											variant='body1'
											fontWeight={600}
											sx={{ color: "text.secondary" }}
										>
											{`${Math.round(item.perct)}%`}
										</Typography>
									</Box>
								</Box>
							</Box>
							<Box>
								<Typography variant='body1' fontWeight='bold'>
									{item.title}
								</Typography>
								<Typography variant='body2' color='text.secondary'>
									RM {item.balance} / RM {item.total}
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
									idx < item.details.length - 1 ? "1px solid #e0e0e0" : ""
								}
							>
								<Box>
									<Typography variant='body2'>{detail.title}</Typography>
									<Typography variant='caption' color='text.secondary'>
										Amount: {detail.amount}
									</Typography>
								</Box>
								<Stack direction='row' alignItems='center' spacing={1}>
									<Chip
										label={detail.status}
										size='small'
										color={detail.statusColor}
										sx={{
											width: "80px",
											marginBottom: "4px",
											color: "#ffffff",
										}}
									/>
									<Stack alignItems={"flex-end"} sx={{ width: "70px" }}>
										<Typography
											textAlign='right'
											variant='caption'
											color='text.secondary'
										>
											{detail.date}
										</Typography>
									</Stack>
								</Stack>
							</Box>
						))}
					</AccordionDetails>
				</Accordion>
			))}
		</>
	);
};

export default AccordionComponent;
