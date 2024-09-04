"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/hooks/use-toast";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { UploadDropzone } from "@/lib/uploadthing";
import { useSession } from "next-auth/react";

interface OrgImpDetails {
	name: string;
	description: string;
	orgLogo: string;
}

export default function OrgImpDetailsPage() {
	const { data: session, status } = useSession();
	const router = useRouter();
	const [formData, setFormData] = useState<OrgImpDetails>({
		name: "",
		description: "",
		orgLogo: "",
	});
	const [errors, setErrors] = useState<Partial<OrgImpDetails>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { toast } = useToast();

	function validateForm() {
		const newErrors: Partial<OrgImpDetails> = {};

		if (!formData.name.trim()) {
			newErrors.name = "Organization name is required.";
		}

		if (!formData.description.trim()) {
			newErrors.description = "Description is required.";
		}
		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	}

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault(); // Prevent form from refreshing the page

		if (status === "unauthenticated") {
			toast({
				title: "Please authenticate to proceed.",
				variant: "destructive",
			});
			return;
		}

		if (validateForm()) {
			setIsSubmitting(true);

			try {
				const response = await axios.post("/api/org/create", {
					formData,
				});

				if (response.data.message) {
					toast({
						title: response.data.message,
					});
					router.push("/");
				} else {
					toast({
						title: "Organization created successfully",
					});
				}

				setFormData({
					name: "",
					description: "",
					orgLogo: "",
				});
			} catch (error) {
				console.error("Error saving organization details:", error);
				toast({
					title: "An error occurred while saving the organization details.",
					variant: "destructive",
				});
			} finally {
				setIsSubmitting(false);
			}
		}
	}

	if (status === "loading") {
		// Show a loading state while checking authentication
		return <p>Loading...</p>;
	}

	return (
		<div className="container mx-auto p-4">
			<div className="text-center text-3xl font-bold py-10">
				Please add your Organization details
			</div>
			<Card>
				<CardHeader>
					<h2 className="text-xl font-semibold">
						Organization Details
					</h2>
				</CardHeader>
				<CardContent>
					{status === "unauthenticated" && (
						<p className="text-red-500 text-sm mb-4">
							Please authenticate to access this page.
						</p>
					)}
					{status === "authenticated" && (
						<form onSubmit={handleSubmit}>
							<div className="mb-4">
								<Label>Org Name</Label>
								<Input
									id="name"
									value={formData.name}
									onChange={(e) =>
										setFormData({
											...formData,
											name: e.target.value,
										})
									}
									aria-invalid={
										errors.name ? "true" : undefined
									}
									className="mt-1 block w-full"
								/>
								{errors.name && (
									<p className="text-red-500 text-sm mt-1">
										{errors.name}
									</p>
								)}
							</div>
							<div className="mb-4">
								<Label>Description</Label>
								<Textarea
									id="description"
									value={formData.description}
									onChange={(e) =>
										setFormData({
											...formData,
											description: e.target.value,
										})
									}
									aria-invalid={
										errors.description ? "true" : undefined
									}
									className="mt-1 block w-full"
								/>
								{errors.description && (
									<p className="text-red-500 text-sm mt-1">
										{errors.description}
									</p>
								)}
							</div>
							<div className="mb-4">
								<div className="mb-4">
									<Label className="block mb-2 ">Logo</Label>
									<UploadDropzone
										endpoint="imageUploader"
										onClientUploadComplete={(res: any) => {
											console.log("Files: ", res);
											setFormData({
												...formData,
												orgLogo: res[0]?.url,
											});
										}}
										onUploadError={(error: Error) => {
											alert(`ERROR! ${error.message}`);
										}}
									/>
									{formData.orgLogo && (
										<img
											src={formData.orgLogo}
											alt="Logo"
											style={{
												width: "100px",
												height: "100px",
											}}
										/>
									)}
								</div>
							</div>
							<Button
								type="submit"
								disabled={isSubmitting}>
								{isSubmitting ? "Submitting..." : "Submit"}
							</Button>
						</form>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
