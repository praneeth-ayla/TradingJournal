"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/toggle-mode";
import Link from "next/link";
import React, { useEffect } from "react";
import useGetOrg from "@/components/hooks/useGetOrg";

export default function VerifiedPage() {
	const { data: session, status } = useSession();
	const { error, loading, org } = useGetOrg();

	const router = useRouter();
	useEffect(() => {
		// Check the user's verified status
		// @ts-ignore
		if (status === "authenticated" && session?.user?.verified === false) {
			// Redirect to the verification page if the user is not verified
			router.push("/verify");
		}
		console.log(session);
	}, [status, session]);

	return (
		<div>
			{/* Page content for verified users */}
			<h1 className="text-5xl font-extrabold text-center ">
				Organisation: {!loading && org.name}
			</h1>
			<div className="text-center h-[40vh] flex justify-center items-center gap-10">
				<Button
					onClick={() => {
						router.push("/create");
					}}>
					Create New Role
				</Button>
				<Button
					onClick={() => {
						router.push("/roles");
					}}>
					Previous Role
				</Button>
			</div>
		</div>
	);
}
