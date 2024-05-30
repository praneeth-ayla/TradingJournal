import Link from "next/link";
import { CardDescription, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import DateTimeDisplay from "./TimeConverter";
import { UserPost, UserDetails } from "../lib/types";
import { ShareIcon } from "lucide-react";

export default function PostsList({
	post,
	userDetails,
}: {
	post: UserPost;
	userDetails: UserDetails;
}) {
	return (
		<Link href={`/post/view?postId=${post.id}`}>
			<div className="px-4  border-b pb-8">
				<div className="flex gap-3 items-center pb-3">
					<Avatar className="w-8 h-8 ">
						<AvatarImage src={userDetails?.image}></AvatarImage>
						<AvatarFallback>
							{userDetails?.name.charAt(0)}
						</AvatarFallback>
					</Avatar>
					<div>{userDetails?.name}</div>
				</div>
				<CardTitle className="pb-3">
					<div> {post.title}</div>
				</CardTitle>
				<CardDescription>
					{post.description.length > 150
						? post.description.slice(0, 150) + "..."
						: post.description}
				</CardDescription>
				<div className=" flex justify-between items-center text-muted-foreground text-sm pt-3">
					{DateTimeDisplay(post.postedOn).slice(0, 17)}
					<ShareIcon className="h-4 md:h-5"></ShareIcon>
				</div>
			</div>
		</Link>
	);
}
