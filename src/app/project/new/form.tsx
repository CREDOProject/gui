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

const formSchema = z.object({
	projectName: z.string().min(2, {
		message: "Project name must be at least 2 characters.",
	}),
	baseDistribution: z.enum(["ubuntu", "fedora"]),
})

export function NewProjectForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			projectName: "",
			baseDistribution: "ubuntu",
		},
	})
	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values)
	}
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
		</Form >
	)
}
