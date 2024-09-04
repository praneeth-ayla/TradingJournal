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
	const { name, description, orgLogo: imageUrl } = body.formData;
	console.log(name, description, imageUrl);

	// Basic validation
	if (!name || !description || !imageUrl) {
		return NextResponse.json(
			{ message: "All fields are required." },
			{ status: 400 }
		);
	}

	try {
		// Create the organization and associate it with the existing admin
		const orgDetails = await db.organization.create({
			data: {
				name,
				description,
				imageUrl,
				admin: {
					// @ts-ignore
					connect: { id: session.user.id }, // Connect to the existing admin
				},
			},
		});

		// Now update the admin's `verified` field in a separate operation
		await db.admin.update({
			// @ts-ignore
			where: { id: session.user.id },
			data: { verified: true },
		});

		// Respond with a success message
		return NextResponse.json({
			message: "Organization details saved successfully",
			orgDetails,
		});
	} catch (error) {
		console.error("Error saving organization details:", error);
		return NextResponse.json(
			{ message: "An error occurred while saving organization details." },
			{ status: 500 }
		);
	}
}
