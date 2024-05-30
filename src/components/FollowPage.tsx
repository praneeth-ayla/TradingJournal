import { Follower, SectionType } from "@/lib/types";
import UserCard from "./UserCard";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function FollowPage({
	type,
	follow,
	userName,
	setSectionType,
}: {
	type: string;
	follow: Follower[];
	userName: string;
	setSectionType: (section: SectionType) => void;
}) {
	console.log("==========================================");
	console.log(follow);
	console.log("==========================================");
	return (
		<div className="flex  flex-col gap-3 w-full ">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem>
						<BreadcrumbLink onClick={() => setSectionType("home")}>
							{userName}
						</BreadcrumbLink>
					</BreadcrumbItem>
					<BreadcrumbSeparator />
					<BreadcrumbItem>
						<BreadcrumbPage>{type}</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
			{type === "followers" ? (
				<>
					{follow.map((e) => (
						<UserCard
							name={e.follower.name}
							image={e.follower.image}></UserCard>
					))}
				</>
			) : (
				<>
					{follow.map((e) => (
						<UserCard
							name={e.following.name}
							image={e.following.image}></UserCard>
					))}
				</>
			)}
		</div>
	);
}
