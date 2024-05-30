import { UserDetails } from "@/lib/types";

export default function About({ userDetails }: { userDetails: UserDetails }) {
	return (
		<div>
			<div className="pt-10 text-2xl font-semibold ">
				{userDetails.about}
			</div>
		</div>
	);
}
