"use client";
import { Button } from "@/components/ui/button";
import {
	Avatar,
	AvatarFallback,
	AvatarImage,
} from "../../../components/ui/avatar";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { getSession } from "next-auth/react";
import { Follower, SectionType, UserDetails, UserPost } from "@/lib/types";
import PostsList from "@/components/PostsList";
import About from "@/components/About";
import FollowPage from "@/components/FollowPage";

async function getAuthorId() {
	const userId = await getSession();
	// @ts-ignore
	return userId?.user?.id;
}

export default function page() {
	const [viewId, setViewId] = useState();
	const user = useParams();
	const userId = user.id;
	const [sectionType, setSectionType] = useState<SectionType>("follower");
	const [userDetails, setUserDetails] = useState<UserDetails>();
	const [userPosts, setUserPosts] = useState<UserPost[]>();

	useEffect(() => {
		async function fetchUserDetails(id: string | string[]) {
			const res = await axios.get("/api/user?userId=" + id);
			const vId = await getAuthorId();
			setViewId(vId);

			setUserDetails(res.data.user);
		}
		fetchUserDetails(userId);
	}, []);

	useEffect(() => {
		async function fetchUserPosts(id: string | string[]) {
			const res = await axios.get("/api/user/post?userId=" + id);
			setUserPosts(res.data.posts);
		}
		fetchUserPosts(userId);
	}, []);

	// @ts-ignore
	const isAuthor = viewId === userId ? true : false;
	console.log(userDetails);

	return (
		<div className="flex justify-center items-center  ">
			<div className=" min-h-screen md:grid grid-cols-7 grid-rows-6  lg:w-2/3 md:w-3/4">
				<div className=" col-span-5 row-start-1 row-span-2 flex  flex-col items-center ">
					<div className=" w-full h-24 md:w-5/6 md:h-40  bg-gray-200 ">
						<img
							src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9rdBE33nq903IIaqgwE_iN-nBOass7gk0_g&s"
							alt="cover"
							className="h-full w-full object-cover"
						/>
					</div>
					<div className="hidden md:block self-start p-10 text-3xl font-bold">
						{userDetails?.name}
					</div>
				</div>
				<div className="hidden p-10 col-span-2 row-span-6 md:border-l md:flex md:flex-col gap-10 items-center">
					<div className=" h-10 ">
						<Avatar className=" w-16 h-16 lg:h-20 lg:w-20">
							<AvatarImage
								src={
									userDetails?.image ?? undefined
								}></AvatarImage>
							<AvatarFallback className="text-3xl">
								{userDetails?.name?.charAt(0)}
							</AvatarFallback>
						</Avatar>
					</div>
					<div className=" pt-8">
						<div className="font-bold">{userDetails?.name}</div>
						<div className="text-muted-foreground flex gap-3 ">
							<div
								className=" hover:cursor-pointer  hover:border-b-2"
								onClick={() => setSectionType("following")}>
								{userDetails?.following?.length} following
							</div>
							<div
								className="hover:cursor-pointer hover:border-b-2"
								onClick={() => setSectionType("follower")}>
								{userDetails?.followers?.length}
								{(userDetails?.followers?.length ?? 0) > 1
									? " followers"
									: " follower"}
							</div>
						</div>
						<div className="text-muted-foreground pt-4">
							{userDetails?.userDescription}
						</div>
						<div className="text-muted-foreground pt-3">
							<Button className="rounded-full">Pending...</Button>
						</div>
					</div>
				</div>
				<div className=" md:hidden p-10 col-span-2 row-span-6 md:border-l flex flex-col gap-5">
					<div className="flex gap-3 items-center">
						<Avatar className=" w-16 h-16 lg:h-20 lg:w-20">
							<AvatarImage
								src={
									userDetails?.image ?? undefined
								}></AvatarImage>
							<AvatarFallback className="text-3xl">
								{userDetails?.name?.charAt(0)}
							</AvatarFallback>
						</Avatar>
						<div>
							<div className="font-bold">{userDetails?.name}</div>
							<div className="text-muted-foreground flex gap-3 ">
								<div
									className="  hover:border-b-2 "
									onClick={() => setSectionType("following")}>
									{userDetails?.following?.length} following
								</div>
								<div
									className="hover:border-b-2"
									onClick={() => setSectionType("follower")}>
									{userDetails?.followers?.length}
									{(userDetails?.followers?.length ?? 0) > 1
										? " followers"
										: " follower"}
								</div>
							</div>
						</div>
					</div>
					<Button className="rounded-full">Pending...</Button>
				</div>
				<div className="col-span-5 row-span-4 px-3 gap-3 flex flex-col">
					{sectionType === "home" ? (
						<>
							<div className="px-3 md:border-b flex gap-5">
								<div className="hover:cursor-pointer border-b-2 border-black pb-2">
									Home
								</div>
								<div
									className="hover:cursor-pointer "
									onClick={() => {
										setSectionType("about");
									}}>
									About
								</div>
							</div>
							<div className="pt-3 md:pt-8 gap-6 flex flex-col">
								{userDetails ? (
									userPosts?.map((post) => (
										<PostsList
											key={post.id} // Ensure each element has a unique key
											post={post}
											userDetails={userDetails}
										/>
									))
								) : (
									<></>
								)}
							</div>
						</>
					) : sectionType === "about" ? (
						<>
							<div className="px-3 md:border-b flex gap-5">
								<div
									className="hover:cursor-pointer"
									onClick={() => {
										setSectionType("home");
									}}>
									Home
								</div>
								<div className="hover:cursor-pointer border-b-2 border-black pb-2">
									About
								</div>
							</div>
							{userDetails && (
								<About userDetails={userDetails}></About>
							)}
						</>
					) : sectionType === "follower" ? (
						<>
							{userDetails && (
								<div className="w-full">
									<FollowPage
										type="followers"
										setSectionType={setSectionType}
										follow={userDetails?.followers}
										userName={
											userDetails.name
										}></FollowPage>
								</div>
							)}
						</>
					) : (
						<>
							{userDetails && (
								<div className="w-full">
									<FollowPage
										type="following"
										setSectionType={setSectionType}
										follow={userDetails?.following}
										userName={
											userDetails.name
										}></FollowPage>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}
