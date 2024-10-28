"use client";

import React, { ReactNode } from 'react'

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ChevronUp, Contact, Home, User2, Wrench } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { usePathname } from 'next/navigation';

interface MenuItems {
	title: string,
	icon: ReactNode,
	href: string,
}

const menuItems: MenuItems[] = [
	{
		title: "Home",
		icon: <Home />,
		href: "/",
	},
	{
		title: "Projects",
		icon: <Wrench />,
		href: "/project",
	},
	{
		title: "Groups",
		icon: <Contact />,
		href: "/group",
	},
]
export default function AppSidebar() {
	const path = usePathname();
	return (
		<Sidebar variant="floating">
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>
						CREDO
					</SidebarGroupLabel>
					<SidebarMenu>
						{menuItems.map((item) => (
							<SidebarMenuItem key={item.title}>
								<SidebarMenuButton asChild
									className={
										path === item.href ? "!bg-secondary-foreground !text-primary-foreground" : ""}>
									<Link href={item.href}>
										{item.icon}
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						))}
					</SidebarMenu>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton>
									<User2 /> Username
									<ChevronUp className="ml-auto" />
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent
								side="top"
								className="w-[--radix-popper-anchor-width]">
								<DropdownMenuItem className="bg-red-600 text-white hover:!bg-red-200">
									<span>Sign out</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>

			</SidebarFooter>
		</Sidebar >
	)
}

