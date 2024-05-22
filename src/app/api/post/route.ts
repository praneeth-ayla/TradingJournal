import { authOptions } from "@/lib/authOptions";
import db from "../../../../prisma/db";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
	return NextResponse.json({ message: "hiii" });
}

export async function POST(request: NextRequest) {
	const body = await request.json();
	const userDetails = await getServerSession(authOptions);
	// @ts-ignore
	const authorId = userDetails?.user?.id;
	const elements = JSON.stringify(body.elements);
	const description = JSON.stringify(body.description);
	const data = {
		title: body.title,
		description,
		elements,
		published: true,
		authorId,
	};
	const date = new Date().toISOString();
	const res = await db.posts.create({
		data: {
			title: data.title,
			description: data.description,
			publisehed: data.published,
			elements: data.elements,
			authorId: data.authorId,
		},
	});
	return NextResponse.json({ message: "Post added successfully", post: res });
}
//   title       String
//   description String?
//   elements    String?
//   publisehed  Boolean
//   postedOn    DateTime
//   authorId    String
