"use client";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Card } from "@/components/ui/card";
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group";
import { Label } from "@radix-ui/react-dropdown-menu";
import { toKebabCase } from "@/lib/KebabCase";
import { generateRandomName } from "@/lib/RandomNameGenerator";
import { useEffect } from "react";

const formSchema = z.object({
	projectName: z.string(),
	projectId: z.string(),
	baseDistribution: z.enum(["ubuntu", "fedora"]),
})

export function NewProjectForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			projectName: "",
			projectId: "",
			baseDistribution: "ubuntu",
		},
	})
	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
	}

	const { watch } = form

	useEffect(() => {
		form.setValue("projectId", generateRandomName())
		const { unsubscribe } = watch(
			({ projectName }) => {
				form.setValue("projectId", toKebabCase(projectName || generateRandomName()))
			})
		return () => unsubscribe()
	}, [watch])

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}
				className="max-w-3xl mx-auto space-y-8">
				<FormField
					control={form.control}
					name="projectName"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Project name</FormLabel>
							<FormControl>
								<Input
									placeholder="This is a cool project name!"
									{...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="projectId"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Project Id</FormLabel>
							<FormControl>
								<Label>
									{field.value || " "}
								</Label>
							</FormControl>
							<FormMessage />
						</FormItem>
					)} />
				<FormField
					control={form.control}
					name="baseDistribution"
					render={({ field }) => <>
						<FormItem>
							<FormLabel>Choose your base image</FormLabel>
							<FormControl>
								<ButtonGroup
									onValueChange={field.onChange}
									defaultValue={field.value}>
									<FormItem>
										<ButtonGroupItem
											value="ubuntu"
											className="rounded-lg">
											<Card className="p-4">
												Ubuntu
											</Card>
										</ButtonGroupItem>
									</FormItem>
									<FormItem>
										<ButtonGroupItem
											value="fedora"
											className="rounded-lg">
											<Card className="p-4">
												Fedora
											</Card>
										</ButtonGroupItem>
									</FormItem>
								</ButtonGroup>
							</FormControl>
						</FormItem>
					</>}
				/>
				< Button type="submit" > Create</Button >
			</form >
		</Form>
	)
}
