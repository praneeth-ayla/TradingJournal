"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import dynamic from "next/dynamic";
import { Block } from "@blocknote/core";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";

const Editor = dynamic(() => import("../../../components/BlockNoteEditor"), {
	ssr: false,
});

// Test content
const content = `[{"id":"bb35dd4b56-0e15-4552-b35e-ed19c2dfa402","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"Welcome to this demo!","styles":{}}],"children":[]},{"id":"992b9c80-1d82-44d1-b55a-dba3b5309d4b","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"This is a heading block","styles":{}}],"children":[]},{"id":"cf0a94a8-238f-4fdd-ae27-ea6871135d8a","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"This is a paragraph block","styles":{}}],"children":[]},{"id":"7095c5b1-b21f-490c-a717-d291410c1e23","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"how are you doing","styles":{}}],"children":[]},{"id":"ae4f6ebe-e77d-4708-b478-7ea949abd900","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[{"type":"text","text":"how are you mate","styles":{}}],"children":[]},{"id":"dd335f8b-e987-4491-8cf3-60c0094ccbbb","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":1},"content":[{"type":"text","text":"is there anything I can help you with? ","styles":{}}],"children":[]},{"id":"4f8cd74b-1fdc-4002-8ac1-146c7ed51efb","type":"heading","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left","level":2},"content":[{"type":"text","text":"holac","styles":{}}],"children":[]},{"id":"44669736-b094-4702-9920-136c52c7770c","type":"paragraph","props":{"textColor":"default","backgroundColor":"default","textAlignment":"left"},"content":[],"children":[]}]`;
export default function Page() {
	const [title, setTitle] = useState("");
	const [blocksText, setBlocksText] = useState<Block[]>([]);
	const formik = useFormik({
		initialValues: {
			date: undefined,
			instrument: "",
			tradeType: "",
			entryPoint: "",
			exitPoint: "",
			tradeStrategy: "",
			tags: "",
		},
		validationSchema: Yup.object({
			date: Yup.date().optional(),
			instrument: Yup.string().optional(),
			tradeType: Yup.string().optional(),
			entryPoint: Yup.string().optional(),
			exitPoint: Yup.string().optional(),
			tradeStrategy: Yup.string().optional(),
			tags: Yup.string().optional(),
		}),
		onSubmit: async () => {
			console.log(formik.values);
			const data = {
				title,
				elements: formik.values,
				description: blocksText,
			};
			const res = await axios.post("/api/post", data);
		},
	});
	return (
		<div className="flex items-center justify-center">
			<div className=" w-11/12 md:w-3/4 lg:w-2/3">
				<div className="py-4 text-muted-foreground font-bold text-2xl">
					Add a trade
				</div>
				<Textarea
					className="h-20 text-5xl font-bold pb-3  mb-5 resize-none"
					id="title"
					name="title"
					placeholder="Undefined"
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
				<form onSubmit={formik.handleSubmit}>
					<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
						<div className="grid w-full max-w-sm items-center gap-1.5">
							<Label htmlFor="date">Date</Label>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={"outline"}
										className={cn(
											"w-[280px] justify-start text-left font-normal",
											!formik.values.date &&
												"text-muted-foreground"
										)}>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{formik.values.date ? (
											format(formik.values.date, "PPP")
										) : (
											<span>Date</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0">
									<Calendar
										mode="single"
										selected={formik.values.date}
										onSelect={(date) =>
											formik.setFieldValue("date", date)
										}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
						</div>

						<div className="grid w-full max-w-sm items-center gap-1.5">
							<Label htmlFor="instrument">Instrument</Label>
							<Input
								type="text"
								id="instrument"
								name="instrument"
								placeholder="Instrument"
								value={formik.values.instrument}
								onChange={(e) => {
									formik.handleChange(e);
								}}
							/>
						</div>
						<div className="grid w-full max-w-sm items-center gap-1.5">
							<Label htmlFor="tradeType">Trade Type</Label>
							<Input
								type="text"
								id="tradeType"
								name="tradeType"
								placeholder="Trade Type"
								value={formik.values.tradeType}
								onChange={(e) => {
									formik.handleChange(e);
								}}
							/>
						</div>
						<div className="grid w-full max-w-sm items-center gap-1.5">
							<Label htmlFor="tradeStrategy">
								Trade Strategy
							</Label>
							<Input
								type="text"
								id="tradeStrategy"
								name="tradeStrategy"
								placeholder="Trade Strategy"
								value={formik.values.tradeStrategy}
								onChange={(e) => {
									formik.handleChange(e);
								}}
							/>
						</div>
						<div className="grid w-full max-w-sm items-center gap-1.5">
							<Label htmlFor="tags">Entry Point</Label>
							<Input
								type="number"
								id="entryPoint"
								name="entryPoint"
								placeholder="Entry Point"
								value={formik.values.entryPoint}
								onChange={(e) => {
									formik.handleChange(e);
								}}
							/>
						</div>
						<div className="grid w-full max-w-sm items-center gap-1.5">
							<Label htmlFor="exitPoint">Exit Point</Label>
							<Input
								type="number"
								id="exitPoint"
								name="exitPoint"
								placeholder="Exit Point"
								value={formik.values.exitPoint}
								onChange={(e) => {
									formik.handleChange(e);
								}}
							/>
						</div>
						<div className="grid w-full max-w-sm items-center gap-1.5">
							<Label htmlFor="tags">Tags</Label>
							<Input
								type="text"
								id="tags"
								name="tags"
								placeholder="Tags"
								value={formik.values.tags}
								onChange={(e) => {
									formik.handleChange(e);
								}}
							/>
						</div>
					</div>
					<div className="border rounded-lg my-10 pt-3 dark:pt-0">
						<Editor
							initialContent={content}
							blockTextHandler={setBlocksText}
						/>
					</div>
					<Button type="submit">Submit</Button>
				</form>
			</div>
		</div>
	);
}
