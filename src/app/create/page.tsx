"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useToast } from "@/components/hooks/use-toast";
import { useRouter } from "next/navigation";
import useGetOrg from "@/components/hooks/useGetOrg";

interface RoleDetails {
	name: string;
	description: string;
	skills: string[];
	experience?: any;
	cgpa?: any;
	atsScore?: any;
}

export default function RoleDetailsPage() {
	const [formData, setFormData] = useState<RoleDetails>({
		name: "",
		description: "",
		skills: [],
	});
	const { org } = useGetOrg();
	const [errors, setErrors] = useState<Partial<RoleDetails>>({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { toast } = useToast();
	const router = useRouter();

	async function handleSubmit(event: React.FormEvent) {
		event.preventDefault();

		if (validateForm()) {
			setIsSubmitting(true);

			try {
				const response = await axios.post("/api/role/create", {
					...formData,
					organizationId: org.id,
				});

				toast({
					title: response.data.message || "Role created successfully",
				});
				router.push("/");
			} catch (error) {
				console.error("Error saving role details:", error);
				toast({
					title: "An error occurred while saving the role details.",
					variant: "destructive",
				});
			} finally {
				setIsSubmitting(false);
			}
		}
	}

	function validateForm() {
		const newErrors: Partial<RoleDetails> = {};

		if (!formData.name.trim()) {
			newErrors.name = "Role name is required.";
		}

		if (!formData.description.trim()) {
			newErrors.description = "Description is required.";
		}

		if (
			formData.experience !== undefined &&
			(formData.experience < 0 || formData.experience > 100)
		) {
			newErrors.experience = "Experience must be between 0 and 100.";
		}

		if (
			formData.cgpa !== undefined &&
			(formData.cgpa < 0 || formData.cgpa > 10)
		) {
			newErrors.cgpa = "CGPA must be between 0 and 10.";
		}

		if (
			formData.atsScore !== undefined &&
			(formData.atsScore < 0 || formData.atsScore > 99)
		) {
			newErrors.atsScore = "ATS Score must be between 0 and 99.";
		}

		setErrors(newErrors);

		return Object.keys(newErrors).length === 0;
	}

	const handleSkillChange = (index: number, value: string) => {
		const newSkills = [...formData.skills];
		newSkills[index] = value;
		setFormData({ ...formData, skills: newSkills });
	};

	const handleAddSkill = () => {
		setFormData({ ...formData, skills: [...formData.skills, ""] });
	};

	const handleRemoveSkill = (index: number) => {
		const newSkills = formData.skills.filter((_, i) => i !== index);
		setFormData({ ...formData, skills: newSkills });
	};

	const handleNumberChange =
		(field: keyof RoleDetails) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const value = e.target.value;
			const numberValue = value === "" ? undefined : Number(value);
			setFormData({ ...formData, [field]: numberValue });
		};

	return (
		<div className="container mx-auto p-4">
			<Card>
				<CardHeader>
					<h2 className="text-xl font-semibold">Add Role</h2>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit}>
						<div className="mb-4">
							<Label htmlFor="name">Role Name</Label>
							<Input
								id="name"
								value={formData.name}
								onChange={(e) =>
									setFormData({
										...formData,
										name: e.target.value,
									})
								}
								aria-invalid={errors.name ? "true" : undefined}
								className="mt-1 block w-full"
							/>
							{errors.name && (
								<p className="text-red-500 text-sm mt-1">
									{errors.name}
								</p>
							)}
						</div>
						<div className="mb-4">
							<Label htmlFor="description">
								Role Description
							</Label>
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
						<Card className="mb-4 p-4">
							<Label className="block font-medium text-gray-700">
								Evaluation Criteria
							</Label>
							{formData.skills.map((skill, index) => (
								<div
									key={index}
									className="flex items-center mb-2">
									<Input
										type="text"
										value={skill}
										onChange={(e) =>
											handleSkillChange(
												index,
												e.target.value
											)
										}
										className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									/>
									<button
										type="button"
										onClick={() => handleRemoveSkill(index)}
										className="ml-2 text-red-500 hover:text-red-700">
										Remove
									</button>
								</div>
							))}
							<button
								type="button"
								onClick={handleAddSkill}
								className="text-blue-500 hover:text-blue-700">
								Add Skill
							</button>
							{errors.skills && (
								<p className="text-red-500 text-sm mt-1">
									{errors.skills}
								</p>
							)}
						</Card>
						<Card className="p-4">
							<div className="mb-4">
								<Label htmlFor="experience">
									Min Experience{" "}
									<span className="text-muted-foreground">
										{" "}
										( years )
									</span>
								</Label>
								<Input
									type="number"
									id="experience"
									value={
										formData.experience !== undefined
											? formData.experience
											: ""
									}
									onChange={handleNumberChange("experience")}
									min={0}
									max={100}
									placeholder="e.g., 3"
									className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								/>
								{errors.experience && (
									<p className="text-red-500 text-sm mt-1">
										{errors.experience}
									</p>
								)}
							</div>
							<div className="mb-4">
								<Label htmlFor="cgpa">
									CGPA
									<span className="text-muted-foreground">
										{" "}
										( Points )
									</span>
								</Label>
								<Input
									type="number"
									id="cgpa"
									value={
										formData.cgpa !== undefined
											? formData.cgpa
											: ""
									}
									onChange={handleNumberChange("cgpa")}
									min={0}
									max={10}
									step="0.1"
									placeholder="e.g., 8.5"
									className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								/>
								{errors.cgpa && (
									<p className="text-red-500 text-sm mt-1">
										{errors.cgpa}
									</p>
								)}
							</div>
							<div className="mb-4">
								<Label htmlFor="atsScore">
									ATS Score
									<span className="text-muted-foreground">
										{" "}
										( Percentage )
									</span>
								</Label>
								<Input
									type="number"
									id="atsScore"
									value={
										formData.atsScore !== undefined
											? formData.atsScore
											: ""
									}
									onChange={handleNumberChange("atsScore")}
									min={0}
									max={99}
									placeholder="e.g., 75"
									className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
								/>
								{errors.atsScore && (
									<p className="text-red-500 text-sm mt-1">
										{errors.atsScore}
									</p>
								)}
							</div>
						</Card>
						<Button
							type="submit"
							disabled={isSubmitting}>
							{isSubmitting ? "Submitting..." : "Submit"}
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
