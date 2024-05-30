export interface Follower {
	followerId: string;
	followingId: string;
	requestAcc: boolean;
	follower: {
		id: string;
		name: string;
		image: string;
	};
	following: {
		id: string;
		name: string;
		image: string;
	};
}

export interface UserDetails {
	id: string;
	email: string;
	name: string;
	image: string;
	about: string;
	userDescription: string;
	publicAcc: boolean;
	followers: Follower[];
	following: Follower[];
}

export interface UserPost {
	id: string;
	title: string;
	description: string;
	elements: string;
	published: boolean;
	postedOn: string;
	authorId: string;
}

export type SectionType = "home" | "about" | "follower" | "following";
