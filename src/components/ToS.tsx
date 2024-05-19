import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";

export default function ToS() {
	return (
		<div>
			<Dialog>
				<DialogTrigger className="text-gray-500 hover:text-muted-foreground">
					Terms of service
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Terms of Service</DialogTitle>
						<DialogDescription>
							<h1>Terms of Service</h1>
							<p>
								Welcome to TheTJ. By using our service, you
								agree to the following terms.
							</p>

							<h2>1. Acceptance of Terms</h2>
							<p>
								By accessing or using our Service, you agree to
								be bound by these Terms of Service.
							</p>

							<h2>2. Use of the Service</h2>
							<p>
								You agree to use the Service in accordance with
								all applicable laws and not to engage in any
								unlawful activities.
							</p>

							<h2>3. User Content</h2>
							<p>
								You retain ownership of any content you submit,
								but grant us a license to use it to provide the
								Service.
							</p>

							<h2>4. Termination</h2>
							<p>
								We reserve the right to terminate or suspend
								your access to the Service at any time, without
								notice, for any reason.
							</p>

							<h2>5. Limitation of Liability</h2>
							<p>
								We are not liable for any damages or losses
								resulting from your use of the Service.
							</p>

							<h2>6. Changes to Terms</h2>
							<p>
								We may update these Terms from time to time.
								Continued use of the Service constitutes
								acceptance of the new terms.
							</p>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
}
