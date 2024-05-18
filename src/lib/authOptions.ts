import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import db from "../../prisma/db";

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_ID || "",
			clientSecret: process.env.GOOGLE_SECRET || "",
		}),
	],
	callbacks: {
		async session({ session }) {
			if (session.user?.email) {
				const sessionUser = await db.user.findFirst({
					where: {
						email: session.user.email,
					},
				});
				return { ...session, id: sessionUser?.id };
			}
			return session;
		},
		async signIn({ profile }) {
			if (!profile?.email || !profile?.name) {
				throw new Error("Profile email or name is missing.");
			}
			try {
				const userExists = await db.user.findFirst({
					where: { email: profile?.email },
				});
				if (!userExists) {
					const user = await db.user.create({
						data: {
							email: profile?.email,
							name: profile?.name,
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
