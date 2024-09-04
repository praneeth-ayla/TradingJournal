import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/SessionWrapper";
import { ThemeProvider } from "next-themes";
import Navbar from "../components/Navbar";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Org - Kaizen.ai",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system">
					<Navbar />
					<SessionWrapper>
						{children}
						<Toaster />
					</SessionWrapper>
				</ThemeProvider>
			</body>
		</html>
	);
}
