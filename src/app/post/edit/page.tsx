"use client";
import { useFormik } from "formik";
import * as Yup from "yup";
import dynamic from "next/dynamic";
import { Block } from "@blocknote/core";
import { useEffect, useState } from "react";
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
import { useSearchParams } from "next/navigation";

const Editor = dynamic(() => import("../../../components/BlockNoteEditor"), {
	ssr: false,
});

export default function Page() {
	const param = useSearchParams();
	const postId = param.get("view");

	const [loading, setLoading] = useState(true);
	const [title, setTitle] = useState("");
	const [blocksText, setBlocksText] = useState<Block[]>([]);
	const [description, setDescription] = useState();

	const [data, setData] = useState<any>();
	const [errMsg, setErrorMsg] = useState("");

	useEffect(() => {
		async function getPost(id: string) {
			try {
				const res = await axios.get("/api/post?postId=" + postId);
				if (res.data.data) {
					setTitle(res.data.data.title);
					const jsonDescription = JSON.parse(
						res.data.data.description
					);
					setDescription(res.data.data.description);
					setBlocksText(jsonDescription);
					const jsonData = JSON.parse(res.data.data.elements);
					setData(jsonData);
					setLoading(false);
				}
			} catch (error: any) {
				if (error.response && error.response.status === 404) {
					setErrorMsg(
						"The post you're looking for doesn't exist or you're not authorized to view it."
					);
					setLoading(false);
				} else {
					console.error("Error fetching post:", error);
				}
			}
		}

		if (postId) {
			getPost(postId);
		}
	}, [postId]); // Ensure useEffect runs only when postId changes

	// After the useEffect hook
	useEffect(() => {
		if (!loading && data) {
			formik.setValues({
				date: data.date || new Date(),
				instrument: data.instrument || "",
				tradeType: data.tradeType || "",
				entryPoint: data.entryPoint || "",
				exitPoint: data.exitPoint || "",
				tradeStrategy: data.tradeStrategy || "",
				tags: data.tags || "",
			});
		}
	}, [loading, data]); // Trigger formik.setValues when loading or data changes

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
			const data = {
				title,
				elements: formik.values,
				description: blocksText,
				id: postId,
			};
			const res = await axios.put("/api/post", data);
		},
	});
	return (
		<div>
			{loading ? (
				<div>Loading.....</div>
			) : (
				<div>
					{errMsg ? (
						<div>{errMsg}</div>
					) : (
						<div className="flex items-center justify-center">
							<div className=" w-11/12 md:w-3/4 lg:w-2/3">
								<div className="py-4 text-muted-foreground font-bold text-2xl">
									Add a trade
								</div>
								<Textarea
									className=" text-5xl font-bold pb-3 overflow-hidden whitespace-normal mb-5 resize-none"
									id="title"
									name="title"
									placeholder="Undefined"
									value={title}
									onChange={(e) => {
										setTitle(e.target.value);
									}}
									maxLength={70}
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
															!formik.values
																.date &&
																"text-muted-foreground"
														)}>
														<CalendarIcon className="mr-2 h-4 w-4" />
														{formik.values.date ? (
															format(
																formik.values
																	.date,
																"PPP"
															)
														) : (
															<span>Date</span>
														)}
													</Button>
												</PopoverTrigger>
												<PopoverContent className="w-auto p-0">
													<Calendar
														mode="single"
														selected={
															formik.values.date
														}
														onSelect={(date) =>
															formik.setFieldValue(
																"date",
																date
															)
														}
														initialFocus
													/>
												</PopoverContent>
											</Popover>
										</div>

										<div className="grid w-full max-w-sm items-center gap-1.5">
											<Label htmlFor="instrument">
												Instrument
											</Label>
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
											<Label htmlFor="tradeType">
												Trade Type
											</Label>
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
												value={
													formik.values.tradeStrategy
												}
												onChange={(e) => {
													formik.handleChange(e);
												}}
											/>
										</div>
										<div className="grid w-full max-w-sm items-center gap-1.5">
											<Label htmlFor="tags">
												Entry Point
											</Label>
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
											<Label htmlFor="exitPoint">
												Exit Point
											</Label>
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
										<div className="border rounded-lg">
											<Editor
												initialContent={description}
												blockTextHandler={setBlocksText}
											/>
										</div>
									</div>
									<Button
										type="submit"
										className="my-10">
										Update
									</Button>
								</form>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
