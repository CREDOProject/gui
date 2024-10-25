import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Contact, Globe, Plus } from "lucide-react";
import Link from "next/link";

const HomeNav = () => {
  return (
    <nav>
      <SidebarTrigger />
    </nav>
  )
}

interface HomeButtons {
  title: string;
  icon: JSX.Element;
  href: string;
}

export default function Home() {
  const homeButtons: HomeButtons[] = [{
    title: "Create project",
    icon: (
      <span className="text-teal-600">
        <Plus />
      </span>
    ),
    href: "/project/new"
  },
  {
    title: "Explore public project",
    icon: (
      <span className="text-pink-600">
        <Globe />
      </span>
    ),
    href: "/project/explore",
  }, {
    title: "Create a new group",
    icon: (
      <span className="text-blue-600">
        <Contact />
      </span>
    ),
    href: "/group/new",
  }]

  return (
    <>
      <div className="flex flex-col justify-evenly max-h-screen h-full">
        <HomeNav />
        <div className="flex flex-col items-center justify-center max-h-full h-full">
          <h1 className="text-2xl font-semibold">What can I help with?</h1>
          <div className="flex flex-col items-center animate-in slide-in-from-bottom-8 fade-in">
            <div className="flex space-x-4 mt-6">
              {homeButtons.map(({ icon, title, href }, i) =>
                <Link href={href} key={i}>
                  <Button variant="rounded">
                    {icon}
                    {title}
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div >
    </>
  );
}
