"use client";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
export default function Home() {
	const user = useSession();
	return (
		<div className="flex items-center justify-center h-screen">
			<div>{JSON.stringify(user)}</div>
			<Button onClick={() => signIn()}>SignIn </Button>
			<Button onClick={() => signOut()}>SignOut </Button>
		</div>
	);
}
