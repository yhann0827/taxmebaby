import { useMediaQuery } from "@mui/material";

const useMediaQueries = () => {
	const xsDown = useMediaQuery((theme) => theme.breakpoints.down("xs"), {
		noSsr: true,
	});
	const xsUp = useMediaQuery((theme) => theme.breakpoints.up("xs"), {
		noSsr: true,
	});

	const smDown = useMediaQuery((theme) => theme.breakpoints.down("sm"), {
		noSsr: true,
	});
	const smUp = useMediaQuery((theme) => theme.breakpoints.up("sm"), {
		noSsr: true,
	});
	const mdUp = useMediaQuery((theme) => theme.breakpoints.up("md"), {
		noSsr: true,
	});
	const mdDown = useMediaQuery((theme) => theme.breakpoints.down("md"), {
		noSsr: true,
	});
	const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
		noSsr: true,
	});
	const lgDown = useMediaQuery((theme) => theme.breakpoints.down("lg"), {
		noSsr: true,
	});
	const xlUp = useMediaQuery((theme) => theme.breakpoints.up("xl"), {
		noSsr: true,
	});
	const xlDown = useMediaQuery((theme) => theme.breakpoints.down("xl"), {
		noSsr: true,
	});
	return {
		xsDown,
		xsUp,
		smDown,
		smUp,
		mdDown,
		mdUp,
		lgDown,
		lgUp,
		xlUp,
		xlDown,
	};
};
export default useMediaQueries;
