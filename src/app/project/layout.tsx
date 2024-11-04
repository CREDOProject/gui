import { AppBreadcrumb } from '@/components/app-breadcrumb';
import { Button, buttonVariants } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Globe, Plus } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { ReactNode } from 'react'

const layout = ({ children }: { children?: ReactNode }) => {
  return (
    <>
      <nav className="flex gap-2 items-center">
        <SidebarTrigger />
        <AppBreadcrumb />
        <div className="flex items-center justify-end self-stretch flex-1">
          <span className="-m-2 space-x-2">
            <Button variant="secondary" size="icon">
              <Globe />
            </Button>
            <Link className={buttonVariants({ variant: "default", size: "icon" })} href="/project/new">
              <Plus />
            </Link>
          </span>
        </div>
      </nav>
      <div className="max-w-3xl p-1 mx-auto">
        {children}
      </div>
    </>)
}

export default layout;
