"use client";

import React from 'react'
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from './ui/breadcrumb';
import { usePathname } from 'next/navigation';


export const AppBreadcrumb = () => {
	const pathSegments = usePathname().split("/").slice(1);
	return (
		<Breadcrumb>
			<BreadcrumbList>
				{pathSegments.map((segment, index) => {
					const url = '/' + pathSegments.slice(0, index + 1).join('/');
					const key = `breadcrumb_list${url}`
					if (index === pathSegments.length - 1) {
						return <BreadcrumbItem key={key}>
							<BreadcrumbPage>{segment}</BreadcrumbPage>
						</BreadcrumbItem>
					}
					return [
						<BreadcrumbItem key={key}>
							<BreadcrumbLink href={url}>
								{segment}
							</BreadcrumbLink>
						</BreadcrumbItem>,
						<BreadcrumbSeparator key={`${``}separator`} />
					]
				})}
			</BreadcrumbList>
		</Breadcrumb>
	)
}
