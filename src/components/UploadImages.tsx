"use client";
import { useState, useEffect } from "react";
import { UploadDropzone } from "../lib/uploadthing";
import axios from "axios";
import { Trash } from "lucide-react";

export default function UploadImages({
	image,
	setImage,
}: {
	image: any;
	setImage: (images: string[]) => void;
}) {
	const [images, setImages] = useState<{ url: string; key: string }[]>([]);

	// Update form data when images change
	useEffect(() => {
		setImage(images.map((img) => img.url));
	}, [images, setImage]); // Added setImage to dependency array to avoid stale closures

	return (
		<div>
			<UploadDropzone
				endpoint="imageUploader"
				onClientUploadComplete={(res: any) => {
					// Add new image to the images array
					setImages((prevImages) => [...prevImages, ...res]);
				}}
				onUploadError={(error: Error) => {
					alert(`ERROR! ${error.message}`);
				}}
			/>
			<div className="flex gap-2">
				{images.map((img, i) => (
					<div
						key={i}
						className="relative">
						<img
							src={img.url}
							onClick={() => {
								console.log(img); // For debugging
							}}
							alt={`img${i + 1}`}
							style={{ width: "100px", height: "100px" }}
						/>
					</div>
				))}
			</div>
		</div>
	);
}
