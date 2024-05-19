"use client";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";
import { ModeToggle } from "@/components/ui/toggle-mode";
import Link from "next/link";

export default function Home() {
	const user = useSession();
	return (
		<div className="flex items-center justify-center h-screen">
			<div>
				<ModeToggle></ModeToggle>
			</div>
			<Button>
				<Link href={"/login"}>Login</Link>
			</Button>
			<div>{JSON.stringify(user)}</div>
		</div>
	);
}
