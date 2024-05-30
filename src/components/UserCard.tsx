import { Card, CardTitle } from "./ui/card";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";

export default function UserCard({
	name,
	image,
}: {
	name: string;
	image: string;
}) {
	return (
		<Card className="p-3 flex justify-between ">
			<div className="flex gap-3 items-center">
				<Avatar>
					{image && <AvatarImage src={image}></AvatarImage>}
					<AvatarFallback>{name.charAt(0)}</AvatarFallback>
				</Avatar>
				<CardTitle className="md:text-xl font-bold text-lg ">
					{name}
				</CardTitle>
			</div>
			<Button className="rounded-full">Follow</Button>
		</Card>
	);
}
