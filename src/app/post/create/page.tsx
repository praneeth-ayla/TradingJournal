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

export default function Page() {
	const [title, setTitle] = useState("");
	const [description, setDesciption] = useState("");
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
			if (title === "") {
				alert("Title required");
			} else {
				const data = {
					title,
					elements: formik.values,
					note: blocksText,
					description,
				};
				const res = await axios.post("/api/post", data);
			}
		},
	});
	return (
		<div className="flex items-center justify-center">
			<div className=" w-11/12 md:w-3/4 lg:w-2/3">
				<div className="py-4 text-muted-foreground font-bold text-2xl">
					Add a trade
				</div>
				<Textarea
					className="h-25 text-3xl md:text-4xl lg:text-5xl font-bold pb-3  mb-5 resize-none"
					id="title"
					name="title"
					placeholder="Undefined"
					required
					onChange={(e) => {
						setTitle(e.target.value);
					}}
					maxLength={50}
				/>

				<Textarea
					className="h-25 text-l pb-3 md:text-xl h-32  mb-5 resize-none"
					id="description"
					name="description"
					placeholder="Post Description"
					onChange={(e) => {
						setDesciption(e.target.value);
					}}
					maxLength={200}
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
					<div>
						<div className="mt-3">Notes:</div>
						<div className="border rounded-lg ">
							<Editor blockTextHandler={setBlocksText} />
						</div>
					</div>
					<Button
						type="submit"
						className="my-10">
						Add
					</Button>
				</form>
			</div>
		</div>
	);
}
