"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useEffect } from "react";
import useGetOrg from "@/components/hooks/useGetOrg";
import { Loader } from "lucide-react";

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

	if (loading) {
		return (
			<div className="h-screen flex justify-center items-center">
				<Loader />
			</div>
		);
	}
	if (error) {
		router.push("/verify");
		return (
			<div className="h-screen flex justify-center items-center">
				{error}
			</div>
		);
	}
	return (
		<div>
			{/* Page content for verified users */}
			<h1 className="text-5xl font-extrabold text-center ">
				Organization: {!loading && org.name}
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
