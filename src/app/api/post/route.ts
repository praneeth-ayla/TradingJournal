import { authOptions } from "@/lib/authOptions";
import db from "../../../../prisma/db";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod";

const bodySchema = z.object({
	authorId: z.string().optional(),
	elements: z.string().optional(),
	published: z.boolean().optional(),
	title: z.string(),
	description: z.string().optional(),
	note: z.string().optional(),
});
export async function GET(request: NextRequest) {
	const url = new URL(request.url);
	const searchParams = new URLSearchParams(url.searchParams);
	const postId = searchParams.get("postId");
	const userDetails = await getServerSession(authOptions);
	// @ts-ignore
	const authorId = userDetails?.user?.id;

	if (postId) {
		try {
			const data = await db.posts.findFirst({
				where: {
					id: postId,
				},
			});
			if (data) {
				if (authorId === data.authorId) {
					return NextResponse.json({
						message: "Read/write post.",
						data: data,
					});
				} else if (data.publisehed === true) {
					return NextResponse.json({
						message: "Read only post.",
						data: data,
					});
				}
			}
			return NextResponse.json(
				{
					message:
						"The post you're looking for doesn't exist or you're not authorized to view it.",
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
		message: "API route for request relating post",
	});
}

export async function POST(request: NextRequest) {
	const body = await request.json();
	const userDetails = await getServerSession(authOptions);
	// @ts-ignore
	const authorId = userDetails?.user?.id;
	const elements = JSON.stringify(body.elements);
	const note = JSON.stringify(body.note);

	const data = {
		title: body.title,
		description: body.description,
		elements,
		published: true,
		authorId,
		note,
	};
	const res = await db.posts.create({
		data: {
			title: data.title,
			description: data.description,
			publisehed: data.published,
			elements: data.elements,
			authorId: data.authorId,
			note: data.note,
		},
	});
	return NextResponse.json({ message: "Post added successfully", post: res });
}

export async function PUT(request: NextRequest) {
	const body = await request.json();
	const userDetails = await getServerSession(authOptions);
	// @ts-ignore
	const authorId = userDetails?.user?.id;
	const elements = JSON.stringify(body.elements);
	const note = JSON.stringify(body.notes);
	const data = {
		title: body.title,
		description: body.description,
		elements,
		published: true,
		authorId,
		note: note,
	};
	const date = new Date().toISOString();
	try {
		const res = await db.posts.update({
			where: { id: body.id, authorId },
			data: {
				title: data.title,
				description: data.description,
				publisehed: data.published,
				elements: data.elements,
				authorId: data.authorId,
				note: data.note,
			},
		});
		return NextResponse.json({ message: "Post Updated" });
	} catch (error: any) {
		if (error.code === "P2025") {
			return NextResponse.json(
				{
					message:
						"The post you're trying to update doesn't exist or you don't have access to update it.",
				},
				{ status: 403 }
			);
		}
		return NextResponse.json({ message: error.message }, { status: 500 });
	}
}
