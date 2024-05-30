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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ModeToggle } from "@/components/ui/toggle-mode";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { usePathname, useRouter } from "next/navigation";

interface UserDetails {
	name?: string | null;
	email?: string | null;
	image?: string | null;
}

export default function Navbar() {
	const [userDetails, setUserDetails] = useState<UserDetails>();
	const [url, setUrl] = useState();

	useEffect(() => {
		const getDetails = async () => {
			const session = await getSession();
			setUserDetails(session?.user);
		};
		getDetails();
	}, []);
	const pathname = usePathname();

	function isActive(href: string) {
		return pathname === href ? "text-foreground" : "text-muted-foreground";
	}

	return (
		<div className="flex  w-full flex-col">
			<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
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
								href="/"
								className={`transition-colors hover:text-foreground ${isActive(
									"/"
								)}`}>
								Home
							</Link>
							<Link
								href="/user"
								className={`transition-colors hover:text-foreground ${isActive(
									"/user"
								)}`}>
								User
							</Link>
							<Link
								href="/post/create"
								className={`transition-colors hover:text-foreground ${isActive(
									"/post/create"
								)}`}>
								Add post
							</Link>{" "}
						</nav>
					</SheetContent>
				</Sheet>
				<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-10">
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
							href="/"
							className={`transition-colors hover:text-foreground ${isActive(
								"/"
							)}`}>
							Home
						</Link>
						<Link
							href="/user"
							className={`transition-colors hover:text-foreground ${isActive(
								"/user"
							)}`}>
							User
						</Link>
						<Link
							href="/post/create"
							className={`transition-colors hover:text-foreground ${isActive(
								"/post/create"
							)}`}>
							Add post
						</Link>
					</nav>
					<div className="ml-auto ">
						<ModeToggle></ModeToggle>
					</div>
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
										{userDetails?.name?.charAt(0) ??
											undefined}
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
// "use client";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { useRouter } from "next/router";

// export default function Navbar() {
// 	const [userDetails, setUserDetails] = useState();
// 	const [routerReady, setRouterReady] = useState(false);
// 	const router = useRouter();
// 	useEffect(() => {
// 		setRouterReady(true);
// 	}, []);

// 	useEffect(() => {
// 		const getDetails = async () => {
// 			const session = await getSession();
// 			setUserDetails(session?.user);
// 		};
// 		getDetails();
// 	}, []);

// 	function isActive(href) {
// 		return routerReady && router?.pathname === href
// 			? "text-foreground"
// 			: "text-muted-foreground";
// 	}

// 	return (
// 		<div className="flex w-full flex-col">
// 			<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
// 				<nav className="grid gap-6 text-lg font-medium">
// 					<Link
// 						href="/"
// 						className="flex items-center gap-2 text-lg font-semibold">
// 						<span className="text-2xl font-extrabold">TheTJ</span>
// 						<span className="sr-only">TheTJ</span>
// 					</Link>
// 					<Link
// 						href="/post/create"
// 						className={`transition-colors ${isActive(
// 							"/post/create"
// 						)}`}>
// 						Add post
// 					</Link>
// 					<Link
// 						href="#"
// 						className={`transition-colors ${isActive(
// 							"/dashboard"
// 						)}`}>
// 						Dashboard
// 					</Link>
// 					<Link
// 						href="#"
// 						className={`transition-colors ${isActive(
// 							"/settings"
// 						)}`}>
// 						Settings
// 					</Link>
// 				</nav>
// 			</header>
// 		</div>
// 	);
// }
