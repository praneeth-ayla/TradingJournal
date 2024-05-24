// "use client";
// import Link from "next/link";
// import { Menu, Search } from "lucide-react";

// import { Button } from "@/components/ui/button";

// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuItem,
// 	DropdownMenuLabel,
// 	DropdownMenuSeparator,
// 	DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import { ModeToggle } from "@/components/ui/toggle-mode";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { getSession } from "next-auth/react";
// import { useState } from "react";

// export default function Navbar() {
// 	const [userDetails, setUserDetails] = useState();
// 	const getDetails = async () => {
// 		const res = await getSession();
// 		setUserDetails(userDetails);
// 	};
// 	getDetails();
// 	return (
// 		<div className="flex  w-full flex-col">
// 			<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
// 				<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
// 					<div className="pr-10">
// 						<Link
// 							href="/"
// 							className="flex items-center gap-2 text-lg font-semibold md:text-base">
// 							<span className="text-2xl font-extrabold">
// 								TheTJ
// 							</span>
// 							<span className="sr-only">TheTJ</span>
// 						</Link>
// 					</div>
// 					<Link
// 						href="/post/create"
// 						className="text-muted-foreground transition-colors hover:text-foreground">
// 						Add post
// 					</Link>

// 					<Link
// 						href="#"
// 						className="text-foreground transition-colors hover:text-foreground">
// 						Settings
// 					</Link>
// 				</nav>
// 				<Sheet>
// 					<SheetTrigger asChild>
// 						<Button
// 							variant="outline"
// 							size="icon"
// 							className="shrink-0 md:hidden">
// 							<Menu className="h-5 w-5" />
// 							<span className="sr-only">
// 								Toggle navigation menu
// 							</span>
// 						</Button>
// 					</SheetTrigger>
// 					<SheetContent side="left">
// 						<nav className="grid gap-6 text-lg font-medium">
// 							<Link
// 								href="/"
// 								className="flex items-center gap-2 text-lg font-semibold">
// 								<span className="text-2xl font-extrabold">
// 									TheTJ
// 								</span>
// 								<span className="sr-only">TheTJ</span>
// 							</Link>
// 							<Link
// 								href="/post/create"
// 								className="text-muted-foreground  transition-colors hover:text-foreground">
// 								Add post
// 							</Link>
// 							<Link
// 								href="#"
// 								className="text-muted-foreground hover:text-foreground">
// 								Dashboard
// 							</Link>
// 							<Link
// 								href="#"
// 								className="hover:text-foreground">
// 								Settings
// 							</Link>
// 						</nav>
// 					</SheetContent>
// 				</Sheet>
// 				<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
// 					<div className="ml-auto ">
// 						<ModeToggle></ModeToggle>
// 					</div>
// 					<form className=" flex-1 sm:flex-initial">
// 						<div className="relative">
// 							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
// 							<Input
// 								type="search"
// 								placeholder="Search products..."
// 								className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
// 							/>
// 						</div>
// 					</form>
// 					<DropdownMenu>
// 						<DropdownMenuTrigger asChild>
// 							<Button
// 								variant="secondary"
// 								size="icon"
// 								className="rounded-full">
// 								<Avatar>
// 									<AvatarImage src={userDetails?.image} />
// 									<AvatarFallback>CN</AvatarFallback>
// 								</Avatar>

// 								<span className="sr-only">
// 									Toggle user menu
// 								</span>
// 							</Button>
// 						</DropdownMenuTrigger>
// 						<DropdownMenuContent align="end">
// 							<DropdownMenuLabel>My Account</DropdownMenuLabel>
// 							<DropdownMenuSeparator />
// 							<DropdownMenuItem>Settings</DropdownMenuItem>
// 							<DropdownMenuItem>Support</DropdownMenuItem>
// 							<DropdownMenuSeparator />
// 							<DropdownMenuItem>Logout</DropdownMenuItem>
// 						</DropdownMenuContent>
// 					</DropdownMenu>
// 				</div>
// 			</header>
// 		</div>
// 	);
// }
"use client";
import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { getSession, signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ui/toggle-mode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserDetails {
	name?: string | null;
	email?: string | null;
	image?: string | null;
}

export default function Navbar() {
	const [userDetails, setUserDetails] = useState<UserDetails>();

	useEffect(() => {
		const getDetails = async () => {
			const session = await getSession();
			setUserDetails(session?.user);
		};
		getDetails();
	}, []);

	return (
		<div className="flex  w-full flex-col">
			<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
				<nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
					<div className="pr-10">
						<Link
							href="/"
							className="flex items-center gap-2 text-lg font-semibold md:text-base">
							<span className="text-2xl font-extrabold">
								TheTJ
							</span>
							<span className="sr-only">TheTJ</span>
						</Link>
					</div>
					<Link
						href="/post/create"
						className="text-muted-foreground transition-colors hover:text-foreground">
						Add post
					</Link>

					<Link
						href="#"
						className="text-foreground transition-colors hover:text-foreground">
						Settings
					</Link>
				</nav>
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="shrink-0 md:hidden">
							<Menu className="h-5 w-5" />
							<span className="sr-only">
								Toggle navigation menu
							</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left">
						<nav className="grid gap-6 text-lg font-medium">
							<Link
								href="/"
								className="flex items-center gap-2 text-lg font-semibold">
								<span className="text-2xl font-extrabold">
									TheTJ
								</span>
								<span className="sr-only">TheTJ</span>
							</Link>
							<Link
								href="/post/create"
								className="text-muted-foreground  transition-colors hover:text-foreground">
								Add post
							</Link>
							<Link
								href="#"
								className="text-muted-foreground hover:text-foreground">
								Dashboard
							</Link>
							<Link
								href="#"
								className="hover:text-foreground">
								Settings
							</Link>
						</nav>
					</SheetContent>
				</Sheet>
				<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
					<div className="ml-auto ">
						<ModeToggle></ModeToggle>
					</div>
					<form className=" flex-1 sm:flex-initial">
						<div className="relative">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<Input
								type="search"
								placeholder="Search products..."
								className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
							/>
						</div>
					</form>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="secondary"
								size="icon"
								className="rounded-full">
								<Avatar>
									<AvatarImage
										src={userDetails?.image ?? undefined}
									/>

									<AvatarFallback>
										{userDetails?.name}
									</AvatarFallback>
								</Avatar>

								<span className="sr-only">
									Toggle user menu
								</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>My Account</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Settings</DropdownMenuItem>
							<DropdownMenuItem>Support</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={() => signOut()}>
								Logout
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
		</div>
	);
}
