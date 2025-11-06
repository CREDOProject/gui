"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const signInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

export default function SignIn() {
  return (
    <SignInLayout
      title={<SignInTitle />}
      disclaimer={<SignInBottomDisclaimer />}
    >
      <SignInForm />
    </SignInLayout>
  );
}

const SignInLayout = ({
  title,
  children,
  disclaimer,
}: {
  title: React.ReactNode;
  children: React.ReactNode;
  disclaimer: React.ReactNode;
}) => {
  return (
    <div className="w-full max-w-md space-y-6">
      {title}
      {children}
      {disclaimer}
    </div>
  );
};

const SignInBottomDisclaimer = () => {
  return (
    <p className="text-center text-sm text-muted-foreground">
      By continuing, you agree to our{" "}
      <Link href="/terms" className="underline hover:text-primary">
        Terms
      </Link>{" "}
      and{" "}
      <Link href="/privacy-policy" className="underline hover:text-primary">
        Privacy Policy
      </Link>
    </p>
  );
};

const SignInTitle = () => (
  <div className="text-center">
    <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
    <p className="text-muted-foreground">Sign in to your account</p>
  </div>
);

const SignInForm = () => {
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    signIn("credentials", { ...values, redirectTo: "/" });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="password" placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Sign In
        </Button>
      </form>
    </Form>
  );
};
