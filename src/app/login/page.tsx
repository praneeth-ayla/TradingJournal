"use client";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import ToS from "@/components/ToS";
import Pp from "@/components/Pp";
import { signIn } from "next-auth/react";

export default function DemoCreateAccount() {
	async function handleSignIn(type: string) {
		await signIn(type);
	}

	return (
		<div className="flex items-center justify-center h-screen">
			<Card>
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl">Welcome to TheTJ</CardTitle>
					<CardDescription>
						Your ultimate trading journal to track and share your
						trades
					</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4 ">
					<div className=" gap-6 flex flex-col  ">
						<CardDescription>
							Stay organized, analyze performance, and improve
							your trading strategy.
						</CardDescription>
						<Button
							variant="outline"
							onClick={() => handleSignIn("google")}>
							<Icons.google className="mr-2 h-4 w-4" />
							Google
						</Button>
						<Button
							variant="outline"
							onClick={() => handleSignIn("github")}>
							<Icons.gitHub className="mr-2 h-4 w-4" />
							Github
						</Button>
					</div>
					<div className="flex gap-10">
						<ToS></ToS>
						<Pp></Pp>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
