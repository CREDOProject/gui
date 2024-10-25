import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'
import { NewProjectForm } from './form'

function page() {
	return (
		<>
			<nav>
				<SidebarTrigger />
			</nav>
			<div className="p-1">
				<section className="max-w-3xl mx-auto space-y-1">
					<h1 className="text-2xl font-bold">
						Create a new project
					</h1>
					<p className="text-muted-foreground">
						A project contains all the dependencies and provides a way to build a CREDO environment.
					</p>
					<Separator className="!my-4" />
				</section>
				<NewProjectForm />
			</div>
		</>
	)
}

export default page
