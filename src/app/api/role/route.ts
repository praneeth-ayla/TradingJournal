import { NextRequest, NextResponse } from "next/server";
import db from "../../../../prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		// Check if the user is authenticated
		// @ts-ignore
		if (!session || !session.user || !session.user.id) {
			return NextResponse.json(
				{ message: "Unauthorized" },
				{ status: 401 }
			);
		}

		// Fetch the role associated with the authenticated admin
		const role = await db.role.findFirst({
			where: {
				// @ts-ignore
				adminId: session.user.id,
			},
		});

		if (!role) {
			return NextResponse.json(
				{ message: "Role not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ role });
	} catch (error) {
		console.error("Error fetching role:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}
