import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/toggle-mode";
import Link from "next/link";
import React from "react";

export default function page() {
	return (
		<div>
			<div>Home page</div>
			<div className="flex gap-10 p-10">
				<Button>
					<Link href={"/login"}>Login</Link>
				</Button>
				<Button>
					<Link href={"/post/create"}>Editor</Link>
				</Button>
				<ModeToggle></ModeToggle>
			</div>
			<div></div>
		</div>
	);
}
