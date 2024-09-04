import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../prisma/db";

export async function POST(request: NextRequest) {
	// Get user session
	const session = await getServerSession(authOptions);

	// Check if the user is authenticated
	// @ts-ignore
	if (!session || !session.user || !session.user.id) {
		return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
	}

	// Parse the request body
	const body = await request.json();
	const {
		name,
		description,
		skills,
		experience,
		cgpa,
		atsScore,
		organizationId,
	} = body;
	console.log(
		name,
		description,
		skills,
		experience,
		cgpa,
		atsScore,
		organizationId
	);

	// Basic validation
	if (!name || !description || !organizationId) {
		return NextResponse.json(
			{ message: "Name, description, and organization ID are required." },
			{ status: 400 }
		);
	}

	try {
		// Create the role and associate it with the organization
		const roleDetails = await db.role.create({
			data: {
				name,
				description,
				skills,
				experience: experience ? Number(experience) : undefined,
				cgpa: cgpa ? Number(cgpa) : undefined,
				atsScore: atsScore ? Number(atsScore) : undefined,
				organization: {
					connect: { id: organizationId }, // Connect to the existing organization
				},
			},
		});

		// Respond with a success message
		return NextResponse.json({
			message: "Role details saved successfully",
			roleDetails,
		});
	} catch (error) {
		console.error("Error saving role details:", error);
		return NextResponse.json(
			{ message: "An error occurred while saving role details." },
			{ status: 500 }
		);
	}
}
