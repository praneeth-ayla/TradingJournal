import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import db from "../../../../../prisma/db";

export async function GET(request: NextRequest) {
	const url = new URL(request.url);
	const searchParams = new URLSearchParams(url.searchParams);
	const userId = searchParams.get("userId");
	const viewerDetails = await getServerSession(authOptions);
	// @ts-ignore
	const viewerId = viewerDetails?.user?.id;

	if (userId) {
		try {
			// Returns all the user's posts
			if (viewerId === userId) {
				const posts = await db.posts.findMany({
					where: { authorId: userId },
				});
				return NextResponse.json({
					posts,
				});
			}

			// Public Account returns public posts if logged in
			const userDetails = await db.user.findFirst({
				where: {
					id: userId,
				},
			});
			if (userDetails?.publicAcc) {
				const posts = await db.posts.findMany({
					where: { authorId: userId, publisehed: true },
				});

				return NextResponse.json({
					posts,
				});
			}

			// Private Account returns public posts only when the viewer is following the user
			const request = await db.follows.findFirst({
				where: {
					followerId: viewerId,
					followingId: userId,
				},
			});
			if (request?.requestAcc) {
				const posts = await db.posts.findMany({
					where: {
						authorId: userId,
						publisehed: true,
					},
				});

				return NextResponse.json({
					posts,
				});
			}

			// If user doesn't exists
			return NextResponse.json(
				{
					message:
						"The user you're looking for doesn't exist or you don't have access to view his profile.",
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
		message: "API route for request relating post read",
	});
}
