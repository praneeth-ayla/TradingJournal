import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../prisma/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export async function GET(request: NextRequest) {
	const url = new URL(request.url);
	const searchParams = new URLSearchParams(url.searchParams);
	const userId = searchParams.get("userId");
	const followerDetails = await getServerSession(authOptions);

	// @ts-ignore
	const followerId = followerDetails?.user?.id;

	try {
		if (userId) {
			// Checking if entry already exists
			const req = await db.follows.findFirst({
				where: { followerId, followingId: userId },
			});

			// If entry exists delete the follow request
			if (req) {
				const deleteEntry = await db.follows.deleteMany({
					where: { followerId, followingId: userId },
				});
				return NextResponse.json({
					deleteEntry,
				});
			}

			// Else create a follow request, if public acc follow directly
			const followingUser = await db.user.findFirst({
				where: { id: userId },
			});

			// Checking if public account
			let requestAcc = followingUser?.publicAcc;

			const addEntry = await db.follows.create({
				data: {
					followerId,
					followingId: userId,
					requestAcc,
				},
			});
			return NextResponse.json({ followingUser, addEntry });
		}

		return NextResponse.json({
			message: "API endpoint for sending and deleting follow request",
		});
	} catch (error: any) {
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}

export async function PUT(request: NextRequest) {
	const url = new URL(request.url);
	const searchParams = new URLSearchParams(url.searchParams);
	const userDetails = await getServerSession(authOptions);
	const followerId = searchParams.get("userId");
	const requestType = searchParams.get("request");
	// @ts-ignore
	const userId = userDetails?.user?.id;

	console.log(requestType, "type");

	if (followerId) {
		// Deleting Follow request
		if (requestType === "delete") {
			const deleteEntry = await db.follows.deleteMany({
				where: { followerId, followingId: userId },
			});
			return NextResponse.json({
				message: "Follow request Rejected",
			});
		}

		// Accepting Follow requeset
		const req = await db.follows.updateMany({
			where: { followerId, followingId: userId },
			data: { requestAcc: true },
		});
		return NextResponse.json({
			message: "Request Accepted",
			requestType,
			req,
		});
	}
}
