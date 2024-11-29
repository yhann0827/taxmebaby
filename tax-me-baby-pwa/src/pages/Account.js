import React, { useState } from "react";
import { useDropzone } from "react-dropzone"; // Import react-dropzone
import {
	Avatar,
	Box,
	Button,
	Divider,
	FormControlLabel,
	Paper,
	Radio,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

const Account = () => {
	// Consolidated state for all questions
	const [formState, setFormState] = useState({
		governmentServant: "",
		disabledPerson: "",
		maritalStatus: "",
		childrenCount: 0,
		employmentStatus: "",
		educationLevel: "",
		residenceType: "",
		incomeRange: "",
		contactMethod: "",
		healthInsurance: "",
		nationality: "",
	});

	const [image, setImage] = useState(null); // Store the uploaded or captured image

	// Handle file upload or camera trigger
	const onDrop = (acceptedFiles) => {
		const file = acceptedFiles[0];
		if (file) {
			setImage(URL.createObjectURL(file)); // Create an object URL for the uploaded image
		}
	};

	// Setup react-dropzone for file upload
	const { getRootProps, getInputProps } = useDropzone({
		onDrop, // Handle file drop or camera trigger
		accept: "image/*", // Only accept image files
	});

	// Handle state changes for all questions
	const handleChange = (name) => (event) => {
		const { value } = event.target;
		setFormState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	// Array of questions to be mapped
	const questions = [
		{
			label: "Are you a government servant?",
			value: formState.governmentServant,
			setter: "governmentServant",
			options: ["yes", "no"],
		},
		{
			label: "Are you a disabled person?",
			value: formState.disabledPerson,
			setter: "disabledPerson",
			options: ["yes", "no"],
		},
		{
			label: "Marital Status",
			value: formState.maritalStatus,
			setter: "maritalStatus",
			options: ["yes", "no"],
		},
		{
			label: "Are you employed?",
			value: formState.employmentStatus,
			setter: "employmentStatus",
			options: ["yes", "no"],
		},
		{
			label: "Do you have a higher education degree?",
			value: formState.educationLevel,
			setter: "educationLevel",
			options: ["yes", "no"],
		},
		{
			label: "Do you own your residence?",
			value: formState.residenceType,
			setter: "residenceType",
			options: ["yes", "no"],
		},
		{
			label: "Do you have a health insurance?",
			value: formState.healthInsurance,
			setter: "healthInsurance",
			options: ["yes", "no"],
		},
		{
			label: "Do you have a nationality?",
			value: formState.nationality,
			setter: "nationality",
			options: ["yes", "no"],
		},
	];

	return (
		<>
			{/* Dropzone for file upload (hidden, but can be triggered programmatically) */}
			<div {...getRootProps()} style={{ display: "none" }}>
				<input {...getInputProps()} />
			</div>

			<Paper sx={{ p: 2 }} elevation={0}>
				<Stack direction='column' spacing={3} alignItems='center'>
					<Stack spacing={1} alignItems='center'>
						{/* Profile Picture */}

						{image ? (
							<Avatar
								alt='Jacky'
								src={image}
								sx={{ width: 120, height: 120 }}
								{...getRootProps()}
							/>
						) : (
							<Button
								variant='contained'
								color='secondary'
								{...getRootProps()}
								sx={{
									borderRadius: "50%",
									width: 120,
									height: 120,
								}}
							>
								<FontAwesomeIcon icon={faCamera} size='3x' />
							</Button>
						)}

						{/* Profile Name and Role */}
						<Typography variant='h6' fontWeight={600}>
							Jacky
						</Typography>
						<Typography variant='body1' fontWeight={600} color='textSecondary'>
							Fresh Graduate
						</Typography>
					</Stack>

					<Box sx={{ width: "100%", mt: 3 }}>
						{/* Personal Details */}
						<Typography
							sx={{ mb: 2 }}
							variant='body1'
							color='text.secondary'
							fontWeight={600}
						>
							Total Deductibles
						</Typography>
						{/* Questions */}
						<Stack spacing={1}>
							{questions.map(({ label, value, setter, options }, index) => (
								<React.Fragment key={label}>
									<Stack
										direction='row'
										alignItems='center'
										justifyContent='space-between'
									>
										<Typography variant='body1'>{label}</Typography>

										<Stack direction='row'>
											{options.map((option) => (
												<FormControlLabel
													key={option}
													control={
														<Radio
															checked={value === option}
															onChange={handleChange(setter)}
															value={option}
														/>
													}
													label={
														<Typography
															variant='body1'
															textTransform='capitalize'
														>
															{option}
														</Typography>
													}
												/>
											))}
										</Stack>
									</Stack>
									{questions.length - 1 !== index && <Divider />}
								</React.Fragment>
							))}
							<Divider />
							<Stack
								direction='row'
								alignItems='center'
								justifyContent='space-between'
							>
								<Typography variant='body1'>No. of children</Typography>

								{/* Number of Children */}
								<TextField
									sx={{
										"& .MuiOutlinedInput-input": {
											padding: "6px 8px",
										},
										width: "100px",
									}}
									hiddenLabel
									type='number'
									value={formState.childrenCount}
									onChange={(e) => handleChange("childrenCount")(e)}
								/>
							</Stack>
						</Stack>
					</Box>
				</Stack>
			</Paper>
		</>
	);
};

export default Account;
