import { authOptions } from "@/lib/authOptions";
import db from "../../../../prisma/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

export async function GET(request: NextRequest) {
	const url = new URL(request.url);
	const searchParams = new URLSearchParams(url.searchParams);
	const userId = searchParams.get("userId");

	// Returns user details
	if (userId) {
		try {
			const userData = await db.user.findFirst({
				where: {
					id: userId,
				},
			});

			if (userData) {
				if (userData?.publicAcc === false) {
					return NextResponse.json({
						message: "private account",
						user: userData,
					});
				} else {
					return NextResponse.json({
						message: "public account",
						user: userData,
					});
				}
			}

			return NextResponse.json(
				{
					message: "The user you're looking for doesn't exist.",
				},
				{ status: 404 }
			);
		} catch (error: any) {
			return NextResponse.json({
				message: error.message,
				status: 500,
			});
		}
	}

	return NextResponse.json({
		message: "API route for request relating user",
	});
}

// Update input validation schema
const userUpdateScehma = z.object({
	name: z.string().optional(),
	image: z.string().optional(),
	publicAcc: z.boolean().optional(),
});

export async function PUT(request: NextRequest) {
	const body = await request.json();
	const userDetails = await getServerSession(authOptions);

	//@ts-ignore
	const userId = userDetails?.user?.id;

	// Input body validation
	const { success } = userUpdateScehma.safeParse(body);

	try {
		if (success) {
			const user = await db.user.update({
				where: {
					id: userId,
				},
				data: body,
			});

			if (user) {
				return NextResponse.json({
					message: "User details updated.",
				});
			}
		}

		// Invalid inputs
		return NextResponse.json(
			{
				message: "Invalid inputs",
			},
			{ status: 404 }
		);
	} catch (error: any) {
		// Return Error message
		return NextResponse.json(
			{
				message: error.message,
			},
			{ status: 500 }
		);
	}
}
