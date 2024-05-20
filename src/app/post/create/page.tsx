"use client";
import { ModeToggle } from "@/components/ui/toggle-mode";

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("../../../components/BlockNoteEditor"), {
	ssr: false,
});

// Test content
const content = `
[{"id":"bb354b56-0e15-4552-b35e-ed19c2dfa402","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Welcome to this demo!","styles":{}}],"children":[]},{"id":"992b9c80-1d82-44d1-b55a-dba3b5309d4b","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"This is a heading block","styles":{}}],"children":[]},{"id":"cf0a94a8-238f-4fdd-ae27-ea6871135d8a","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"This is a paragraph block","styles":{}}],"children":[]},{"id":"7095c5b1-b21f-490c-a717-d291410c1e23","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"how are you doing","styles":{}}],"children":[]},{"id":"d14e4a11-4f1e-4f58-9da9-0fb21684dbd3","type":"image","props":{"backgroundColor":"default","textAlignment":"left","url":"https://utfs.io/f/f985fc2a-f7a0-454f-847d-108721a12dea-nh92j9.jpg","caption":"","width":900},"children":[]},{"id":"ae4f6ebe-e77d-4708-b478-7ea949abd900","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]}]
`;
export default function page() {
	return (
		<div className="flex justify-center items-center">
			<ModeToggle></ModeToggle>
			<div className="w-2/3 ">
				<Editor initialContent={content} />
			</div>
		</div>
	);
}
