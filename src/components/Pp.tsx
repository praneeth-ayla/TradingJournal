import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";

export default function Pp() {
	return (
		<div>
			<Dialog>
				<DialogTrigger className="text-gray-500 hover:text-muted-foreground">
					Privacy Policy
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Privacy Policy</DialogTitle>
						<DialogDescription>
							<h1>Privacy Policy</h1>
							<p>
								Your privacy is important to us. This policy
								explains how we handle your personal
								information.
							</p>

							<h2>1. Information We Collect</h2>
							<p>
								We collect information you provide directly to
								us and information automatically collected when
								you use the Service.
							</p>

							<h2>2. Use of Information</h2>
							<p>
								We use the information to provide, maintain, and
								improve our Service, and to communicate with
								you.
							</p>

							<h2>3. Information Sharing</h2>
							<p>
								We do not share your personal information with
								third parties except as necessary to provide our
								Service or as required by law.
							</p>

							<h2>4. Data Security</h2>
							<p>
								We implement security measures to protect your
								personal data from unauthorized access and
								disclosure.
							</p>

							<h2>5. Cookies and Tracking Technologies</h2>
							<p>
								We use cookies to improve your experience on our
								site. You can control cookies through your
								browser settings.
							</p>

							<h2>6. User Rights</h2>
							<p>
								You have the right to access, correct, or delete
								your personal information. Contact us to
								exercise these rights.
							</p>

							<h2>7. Changes to Privacy Policy</h2>
							<p>
								We may update this Privacy Policy from time to
								time. Please review it periodically.
							</p>

							<h2>8. Contact Information</h2>
							<p>
								If you have any questions about this Privacy
								Policy, please contact us at [Your Contact
								Information].
							</p>
						</DialogDescription>
					</DialogHeader>
				</DialogContent>
			</Dialog>
		</div>
	);
}
