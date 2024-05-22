"use client";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { PartialBlock, BlockNoteEditor, Block } from "@blocknote/core";
import { useTheme } from "next-themes";
import { useState } from "react";
import { uploadFiles } from "@/lib/uploadthing";

interface EditorProps {
	initialContent?: string;
	editable?: boolean;
	blockTextHandler: (blocks: Block[]) => void;
}
// Our <Editor> component we can reuse later
export default function Editor({
	initialContent,
	editable,
	blockTextHandler,
}: EditorProps) {
	const { resolvedTheme } = useTheme();
	// Creates a new editor instance.

	const editor: BlockNoteEditor = useCreateBlockNote({
		initialContent: initialContent
			? (JSON.parse(initialContent) as PartialBlock[])
			: undefined,
		uploadFile: async (file: File) => {
			const [res] = await uploadFiles("imageUploader", { files: [file] });
			return res.url;
		},
	});

	// Renders the editor instance using a React component.
	return (
		<div>
			<BlockNoteView
				editor={editor}
				editable={editable}
				theme={resolvedTheme === "dark" ? "dark" : "light"}
				onChange={() => {
					blockTextHandler(editor.document);
				}}
			/>
		</div>
	);
}
