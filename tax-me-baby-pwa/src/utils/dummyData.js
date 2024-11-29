import { v4 as uuidv4 } from "uuid";
export const taxDeductibleListItems = [
	{
		title: "Lifestyle",
		perct: 70,
		balance: 3500,
		total: 5000,
		details: [
			{
				title: "Monthly Gym Membership Subscription",
				amount: "RM199",
				date: "12 Nov 2024",
				status: "Verified",
				statusColor: "success",
				imgUrl:
					"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
			},
			{
				title: "Donation to National Art Gallery Fund",
				amount: "RM300",
				date: "25 Oct 2024",
				status: "Error",
				statusColor: "error",
				imgUrl:
					"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
			},
			{
				title: "Groceries",
				amount: "RM250",
				date: "10 Oct 2024",
				status: "Pending",
				statusColor: "warning",
				imgUrl:
					"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
			},
		],
	},
	{
		title: "Equipment for Disabled Person",
		perct: 30,
		balance: 500,
		total: 1000,
		details: [
			{
				title: "Assistive Technology for Visually Impaired",
				amount: "RM500",
				date: "15 Nov 2024",
				status: "Pending",
				statusColor: "warning",
				imgUrl:
					"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
			},
			{
				title: "Braille Books for Education",
				amount: "RM150",
				date: "10 Nov 2024",
				status: "Verified",
				statusColor: "success",
				imgUrl:
					"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
			},
			{
				title: "Wheelchair Purchase",
				amount: "RM350",
				date: "5 Oct 2024",
				status: "Error",
				statusColor: "error",
				imgUrl:
					"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
			},
		],
	},
	{
		title: "Education Fee for Self",
		perct: 50,
		balance: 2500,
		total: 4000,
		details: [
			{
				title: "Tuition Fees for Master's Program",
				amount: "RM1200",
				date: "1 Nov 2024",
				status: "Error",
				statusColor: "error",
				imgUrl:
					"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
			},
			{
				title: "Online Course for Data Science",
				amount: "RM800",
				date: "15 Oct 2024",
				status: "Verified",
				statusColor: "success",
				imgUrl:
					"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
			},
			{
				title: "Books & Study Materials",
				amount: "RM500",
				date: "20 Sep 2024",
				status: "Pending",
				statusColor: "warning",
				imgUrl:
					"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
			},
		],
	},
	{
		title: "Healthcare & Medical Expenses",
		perct: 40,
		balance: 1000,
		total: 2500,
		details: [
			{
				title: "Medical Consultation for Routine Checkup",
				amount: "RM300",
				date: "10 Nov 2024",
				status: "Pending",
				statusColor: "warning",
				imgUrl:
					"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
			},
			{
				title: "Prescription Medication for Chronic Condition",
				amount: "RM500",
				date: "30 Oct 2024",
				status: "Verified",
				statusColor: "success",
				imgUrl:
					"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
			},
			{
				title: "Dental Surgery",
				amount: "RM700",
				date: "1 Oct 2024",
				status: "Error",
				statusColor: "error",
				imgUrl:
					"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
			},
		],
	},
	{
		title: "Home Renovation Expenses",
		perct: 60,
		balance: 1500,
		total: 2500,
		details: [
			{
				title: "Home Office Setup (Furniture & Equipment)",
				amount: "RM1000",
				date: "5 Nov 2024",
				status: "Verified",
				statusColor: "success",
				imgUrl:
					"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
			},
			{
				title: "Air Conditioning Installation",
				amount: "RM500",
				date: "20 Oct 2024",
				status: "Pending",
				statusColor: "warning",
				imgUrl:
					"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
			},
			{
				title: "Bathroom Renovation",
				amount: "RM800",
				date: "10 Sep 2024",
				status: "Error",
				statusColor: "error",
				imgUrl:
					"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
			},
		],
	},
	{
		title: "Charitable Contributions",
		perct: 20,
		balance: 2000,
		total: 5000,
		details: [
			{
				title: "Donation to Local Animal Shelter",
				amount: "RM500",
				date: "1 Nov 2024",
				status: "Verified",
				statusColor: "success",
				imgUrl:
					"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
			},
			{
				title: "Fundraising Event for Orphanage",
				amount: "RM1500",
				date: "15 Oct 2024",
				status: "Error",
				statusColor: "error",
				imgUrl:
					"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
			},
			{
				title: "Contribution to Food Bank",
				amount: "RM300",
				date: "20 Sep 2024",
				status: "Pending",
				statusColor: "warning",
				imgUrl:
					"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
			},
		],
	},
	{
		title: "Transportation Expenses",
		perct: 35,
		balance: 1000,
		total: 3000,
		details: [
			{
				title: "Monthly Car Loan Repayment",
				amount: "RM500",
				date: "10 Nov 2024",
				status: "Error",
				statusColor: "error",
				imgUrl:
					"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
			},
			{
				title: "Fuel Costs for Work Commute",
				amount: "RM200",
				date: "5 Nov 2024",
				status: "Verified",
				statusColor: "success",
				imgUrl:
					"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
			},
			{
				title: "Taxi Fare for Business Trip",
				amount: "RM150",
				date: "1 Oct 2024",
				status: "Pending",
				statusColor: "warning",
				imgUrl:
					"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
			},
		],
	},
	{
		title: "Retirement Savings",
		perct: 75,
		balance: 3000,
		total: 4000,
		details: [
			{
				title: "Retirement Fund Contribution",
				amount: "RM1500",
				date: "25 Oct 2024",
				status: "Pending",
				statusColor: "warning",
				imgUrl:
					"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
			},
			{
				title: "Pension Plan Payment",
				amount: "RM1000",
				date: "5 Oct 2024",
				status: "Verified",
				statusColor: "success",
				imgUrl:
					"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
			},
			{
				title: "Voluntary Savings to Retirement Account",
				amount: "RM500",
				date: "20 Sep 2024",
				status: "Error",
				statusColor: "error",
				imgUrl:
					"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
			},
		],
	},
];

export const planningInitialState = [
	{
		id: uuidv4(),
		title: "Purchase New Phone",
		category: "Lifestyle expenses",
		price: "RM4,500",
		date: "2024-01-01", // Using standard date format (YYYY-MM-DD)
	},
	{
		id: uuidv4(),
		title: "Renewing Gym Membership",
		category: "Sports Equipment",
		price: "RM300",
		date: "2024-01-02",
	},
	{
		id: uuidv4(),
		title: "Dental Checkup",
		category: "Medical Treatment",
		price: "RM99.90",
		date: "2024-01-03",
	},
	{
		id: uuidv4(),
		title: "Taking MBA Course",
		category: "Self Education",
		price: "RM6,000",
		date: "2024-01-04",
	},
];

export const receiptDetails = [
	{
		title: "Pa Kra Pow",
		amount: "RM40",
	},
	{
		title: "Steamed Rice",
		amount: "RM2",
	},
	{
		title: "Red Curry",
		amount: "RM20",
	},
	{
		title: "Pad Thai",
		amount: "RM15",
	},
];

export const invoiceItems = [
	{
		date: "May 13, 2024",
		invoices: [
			{
				title: "Lifestyle",
				perct: 70,
				balance: 3500,
				total: 5000,
				details: [
					{
						title: "Monthly Gym Membership Subscription",
						amount: "RM199",
						date: "12 Nov 2024",
						status: "Verified",
						statusColor: "success",
						imgUrl:
							"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
					},
					{
						title: "Donation to National Art Gallery Fund",
						amount: "RM300",
						date: "25 Oct 2024",
						status: "Error",
						statusColor: "error",
						imgUrl:
							"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
					},
					{
						title: "Groceries",
						amount: "RM250",
						date: "10 Oct 2024",
						status: "Pending",
						statusColor: "warning",
						imgUrl:
							"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
					},
				],
			},
			{
				title: "Equipment for Disabled Person",
				perct: 30,
				balance: 500,
				total: 1000,
				details: [
					{
						title: "Assistive Technology for Visually Impaired",
						amount: "RM500",
						date: "15 Nov 2024",
						status: "Pending",
						statusColor: "warning",
						imgUrl:
							"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
					},
					{
						title: "Braille Books for Education",
						amount: "RM150",
						date: "10 Nov 2024",
						status: "Verified",
						statusColor: "success",
						imgUrl:
							"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
					},
					{
						title: "Wheelchair Purchase",
						amount: "RM350",
						date: "5 Oct 2024",
						status: "Error",
						statusColor: "error",
						imgUrl:
							"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
					},
				],
			},
			{
				title: "Education Fee for Self",
				perct: 50,
				balance: 2500,
				total: 4000,
				details: [
					{
						title: "Tuition Fees for Master's Program",
						amount: "RM1200",
						date: "1 Nov 2024",
						status: "Error",
						statusColor: "error",
						imgUrl:
							"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
					},
					{
						title: "Online Course for Data Science",
						amount: "RM800",
						date: "15 Oct 2024",
						status: "Verified",
						statusColor: "success",
						imgUrl:
							"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
					},
					{
						title: "Books & Study Materials",
						amount: "RM500",
						date: "20 Sep 2024",
						status: "Pending",
						statusColor: "warning",
						imgUrl:
							"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
					},
				],
			},
		],
	},
	{
		date: "Feb 1, 2024",
		invoices: [
			{
				title: "Healthcare & Medical Expenses",
				perct: 40,
				balance: 1000,
				total: 2500,
				details: [
					{
						title: "Medical Consultation for Routine Checkup",
						amount: "RM300",
						date: "10 Nov 2024",
						status: "Pending",
						statusColor: "warning",
						imgUrl:
							"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
					},
					{
						title: "Prescription Medication for Chronic Condition",
						amount: "RM500",
						date: "30 Oct 2024",
						status: "Verified",
						statusColor: "success",
						imgUrl:
							"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
					},
					{
						title: "Dental Surgery",
						amount: "RM700",
						date: "1 Oct 2024",
						status: "Error",
						statusColor: "error",
						imgUrl:
							"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
					},
				],
			},
			{
				title: "Home Renovation Expenses",
				perct: 60,
				balance: 1500,
				total: 2500,
				details: [
					{
						title: "Home Office Setup (Furniture & Equipment)",
						amount: "RM1000",
						date: "5 Nov 2024",
						status: "Verified",
						statusColor: "success",
						imgUrl:
							"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
					},
					{
						title: "Air Conditioning Installation",
						amount: "RM500",
						date: "20 Oct 2024",
						status: "Pending",
						statusColor: "warning",
						imgUrl:
							"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
					},
					{
						title: "Bathroom Renovation",
						amount: "RM800",
						date: "10 Sep 2024",
						status: "Error",
						statusColor: "error",
						imgUrl:
							"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
					},
				],
			},
			{
				title: "Charitable Contributions",
				perct: 20,
				balance: 2000,
				total: 5000,
				details: [
					{
						title: "Donation to Local Animal Shelter",
						amount: "RM500",
						date: "1 Nov 2024",
						status: "Verified",
						statusColor: "success",
						imgUrl:
							"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
					},
					{
						title: "Fundraising Event for Orphanage",
						amount: "RM1500",
						date: "15 Oct 2024",
						status: "Error",
						statusColor: "error",
						imgUrl:
							"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
					},
					{
						title: "Contribution to Food Bank",
						amount: "RM300",
						date: "20 Sep 2024",
						status: "Pending",
						statusColor: "warning",
						imgUrl:
							"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
					},
				],
			},
			{
				title: "Transportation Expenses",
				perct: 35,
				balance: 1000,
				total: 3000,
				details: [
					{
						title: "Monthly Car Loan Repayment",
						amount: "RM500",
						date: "10 Nov 2024",
						status: "Error",
						statusColor: "error",
						imgUrl:
							"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
					},
					{
						title: "Fuel Costs for Work Commute",
						amount: "RM200",
						date: "5 Nov 2024",
						status: "Verified",
						statusColor: "success",
						imgUrl:
							"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
					},
					{
						title: "Taxi Fare for Business Trip",
						amount: "RM150",
						date: "1 Oct 2024",
						status: "Pending",
						statusColor: "warning",
						imgUrl:
							"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
					},
				],
			},
		],
	},

	{
		date: "Jan 5,2024",
		invoices: [
			{
				title: "Retirement Savings",
				perct: 75,
				balance: 3000,
				total: 4000,
				details: [
					{
						title: "Retirement Fund Contribution",
						amount: "RM1500",
						date: "25 Oct 2024",
						status: "Pending",
						statusColor: "warning",
						imgUrl:
							"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
					},
					{
						title: "Pension Plan Payment",
						amount: "RM1000",
						date: "5 Oct 2024",
						status: "Verified",
						statusColor: "success",
						imgUrl:
							"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
					},
					{
						title: "Voluntary Savings to Retirement Account",
						amount: "RM500",
						date: "20 Sep 2024",
						status: "Error",
						statusColor: "error",
						imgUrl:
							"https://c8.alamy.com/comp/CNTYDX/tesco-shopping-receipt-CNTYDX.jpg",
					},
				],
			},
		],
	},
];
export const bankTransactions = [
	{
		date: "Jan 5, 2024",
		invoices: [
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
	},
	{
		date: "Jan 6, 2024",
		invoices: [
			{
				title: "AMERICAN EXPRESS",
				amount: "RM1200",
			},
			{
				title: "256810510 DINING AT GASTRO PUB",
				amount: "RM350",
			},
			{
				title: "SALES DEBIT STARBUCKS",
				amount: "RM40",
			},
		],
	},
	{
		date: "Jan 7, 2024",
		invoices: [
			{
				title: "DUITNOW MAYBANK PAY",
				amount: "RM1000",
			},
			{
				title: "256810510 LUXURY BOUTIQUE",
				amount: "RM2000",
			},
		],
	},
	{
		date: "Jan 8, 2024",
		invoices: [
			{
				title: "256810510 COFFEE HOUSE",
				amount: "RM45",
			},
			{
				title: "SALES DEBIT SHOPPING MALL",
				amount: "RM600",
			},
			{
				title: "AMERICAN EXPRESS ONLINE SHOPPING",
				amount: "RM1000",
			},
			{
				title: "256810510 GYM MEMBERSHIP",
				amount: "RM120",
			},
		],
	},
	{
		date: "Jan 9, 2024",
		invoices: [
			{
				title: "DUITNOW CIMB BANK TRANSFER",
				amount: "RM1500",
			},
			{
				title: "256810510 VINTAGE WINE SHOP",
				amount: "RM900",
			},
		],
	},
	{
		date: "Jan 10, 2024",
		invoices: [
			{
				title: "SALES DEBIT ONLINE PURCHASE",
				amount: "RM300",
			},
			{
				title: "256810510 MOVIE TICKET",
				amount: "RM50",
			},
			{
				title: "DUITNOW CIMB PAYROLL",
				amount: "RM3000",
			},
			{
				title: "AMERICAN EXPRESS INTERNATIONAL",
				amount: "RM4500",
			},
			{
				title: "256810510 FLIGHT TICKET PURCHASE",
				amount: "RM2000",
			},
		],
	},
	{
		date: "Jan 11, 2024",
		invoices: [
			{
				title: "256810510 CAR RENTAL",
				amount: "RM350",
			},
			{
				title: "SALES DEBIT MCDONALD'S",
				amount: "RM30",
			},
			{
				title: "DUITNOW PAYPAL TRANSFER",
				amount: "RM250",
			},
		],
	},
	{
		date: "Jan 12, 2024",
		invoices: [
			{
				title: "256810510 COFFEE SHOP",
				amount: "RM20",
			},
			{
				title: "SALES DEBIT FASHION OUTLET",
				amount: "RM400",
			},
			{
				title: "AMERICAN EXPRESS RESTAURANT",
				amount: "RM150",
			},
			{
				title: "256810510 GROCERY SHOPPING",
				amount: "RM250",
			},
		],
	},
];
