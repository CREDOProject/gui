import { auth, signOut } from "@/auth";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SettingsIcon } from "lucide-react";
import { Configuration } from "@/components/aicoder/Configuration/Configuration";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";

const PATHS = {
  SIGN_IN: "/signin",
} as const;

async function checkAuth() {
  const session = await auth();
  if (!session?.user) redirect(PATHS.SIGN_IN);
  return session;
}

const UserInfo = ({ email }: { email?: string | null }) => (
  <div className="text-xs flex flex-col">
    <span>Signed in as</span>
    <span className="font-bold">{email}</span>
  </div>
);

const SignOutButton = () => (
  <Button
    variant="outline"
    size="sm"
    onClick={async () => {
      "use server";
      await signOut();
    }}
  >
    Sign Out
  </Button>
);

const AppTitle = ({ title, beta }: { title: string; beta: boolean }) => (
  <Link href="/app" className="text-sm bold">
    {title}
    {beta && (
      <>
        {" "}
        <span className="outline-blue-400 outline-2 px-2 py-1 rounded-lg text-blue-400 font-bold">
          BETA
        </span>
      </>
    )}
  </Link>
);

const Header = async ({ session }: { session: Session }) => (
  <header className="py-2 px-4 border-b sticky w-full top-0 left-0 z-50 backdrop-blur-sm bg-background/90">
    <div className="mx-auto max-w-(--breakpoint-2xl) w-full flex items-center justify-between">
      <UserInfo email={session.user?.email} />
      <AppTitle title="CREDO" beta={true} />
      <div className="flex space-x-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline">
              <SettingsIcon />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>User Settings</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <Configuration />
          </DialogContent>
        </Dialog>
        <SignOutButton />
      </div>
    </div>
  </header>
);

const AuthenticatedLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await checkAuth();

  return (
    <div className="flex flex-col">
      <Header session={session} />
      <Loader />
      <main className="h-full max-h-screen flex-1 max-w-(--breakpoint-2xl) w-full mx-auto">
        {children}
      </main>
      <Toaster />
    </div>
  );
};

export default AuthenticatedLayout;
