import React, { useState } from "react";
import Link from "next/link";
import { createStyles, Image, Title, Button, Group, Text } from "@mantine/core";
// import { Check } from "tabler-icons-react";

import LoginModal from "../UI/LoginModal";

import tourbookLogo from "../../public/icons/tourbook-2.png";

const useStyles = createStyles((theme) => ({
	title: {
		color: theme.colorScheme === "dark" ? theme.white : theme.black,
		fontFamily: `Greycliff CF, ${theme.fontFamily}`,
		fontSize: 44,
		lineHeight: 1.2,
		fontWeight: 900,
	},

	highlight: {
		position: "relative",
		backgroundColor:
			theme.colorScheme === "dark"
				? theme.fn.rgba(theme.colors[theme.primaryColor][6], 0.55)
				: theme.colors[theme.primaryColor][0],
		borderRadius: theme.radius.sm,
		padding: "4px 12px",
		fontSize: "3rem",
	},
}));

export function HeroBanner() {
	const { classes } = useStyles();
	return (
		<>
			<div
				className="row flex justify-content-center align-items-center m-0"
				style={{ height: "90vh" }}
			>
				<div className="row flex my-5 justify-content-center align-items-center mb-5">
					<div className="col-lg-6 justify-content-center">
						<Image src={tourbookLogo.src} placeholder="blur" />
					</div>
					<div className="col-lg-6 p-5 ">
						<Title className={classes.title}>
							<span className={classes.highlight}>One Place to </span>
							<span className={classes.highlight}>manage all Tours</span>
						</Title>
						<Group mt={30}>
							<Link href="/about">
								<Button type="button" variant="default" radius="xl" size="md">
									About us
								</Button>
							</Link>
							<Link href="/tours">
								<Button variant="default" radius="xl" size="md">
									Take me in!
								</Button>
							</Link>
						</Group>
					</div>
				</div>
			</div>
		</>
	);
}
