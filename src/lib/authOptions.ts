import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import db from "../../prisma/db";

// Extending the Profile type
interface ExtendedProfile extends Record<string, any> {
	email?: string;
	name?: string;
	picture?: string;
	avatar_url?: string;
}

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID || "",
			clientSecret: process.env.GOOGLE_SECRET || "",
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_ID || "",
			clientSecret: process.env.GITHUB_SECRET || "",
		}),
	],
	callbacks: {
		async session({ session }) {
			// Adding the user id, name and image from db to the session to access in client side
			if (session.user?.email) {
				const sessionUser = await db.user.findFirst({
					where: {
						email: session.user.email,
					},
				});
				return {
					...session,
					user: {
						...session.user,
						name: sessionUser?.name,
						id: sessionUser?.id,
						image: sessionUser?.image,
					},
				};
			}
			return session;
		},
		async signIn({ profile }) {
			// Image not available in profile type, so extended the type
			const extendedProfile = profile as ExtendedProfile;
			if (!profile?.email || !profile?.name) {
				throw new Error("Profile email or name is missing.");
			}
			const imageUrl =
				extendedProfile?.picture || extendedProfile?.avatar_url || null; // Adjust based on what is available

			// Creating an entry in users table when login for first time.
			try {
				const userExists = await db.user.findFirst({
					where: { email: profile?.email },
				});
				if (!userExists) {
					await db.user.create({
						data: {
							email: profile?.email,
							name: profile?.name,
							image: imageUrl,
						},
					});
				}
				return true;
			} catch (error: any) {
				console.log(error);
				return false;
			}
		},
	},
	secret: process.env.TOKEN_SECRET,
};
