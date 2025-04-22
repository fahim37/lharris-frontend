"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";


import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

// Schema with explicit typing
const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
  rememberMe: z.boolean(),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (response?.error) {
        toast.error("Invalid credentials");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again. || " + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Left section */}
      <div className="hidden lg:flex w-1/2 bg-[#0a1155] text-white p-12 flex-col justify-between relative ">
        <div className="border-[7px] border-[#212767] w-[592px] h-[455px] rounded-[400px] absolute lg:-top-[200px] xl:-bottom-[300px] -left-[500px] rotate-[-45deg]"></div>
        <div>
          <Image src="/assets/lhasis-logo.png" alt="Logo" width={100} height={100} className="w-[60px] h-[83px] mb-[101px] ml-[150px]" />
          <h1 className="mt-4 text-[74px] w-[485px] !text-bold mx-auto text-[#f3f3f3]">Secure Your Home with Clarity</h1>
          <p className="text-[19px] text-center text-[#F7E39F] font-semibold mt-[21px]">Monitor your property with ease and peace of mind.</p>
        </div>
       <div className="border-[7px] border-[white] w-[592px] h-[455px] rounded-[400px] absolute lg:-bottom-[200px] xl:-bottom-[300px] -right-[320px]"></div>
      </div>

      {/* Right section */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-8 py-12 sm:px-16">
        <div className="w-full max-w-md mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Welcome User</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        disabled={isLoading}
                        {...field}
                        className="h-12"
                      />
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
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your password"
                        disabled={isLoading}
                        {...field}
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormLabel className="m-0 text-sm font-normal">Remember me</FormLabel>
                    </FormItem>
                  )}
                />

                <Link href="/auth/forgot-password" className="text-sm text-[#0a1155] hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-[110px] h-12 bg-[#0a1155] hover:bg-[#0a1155]/90 text-base font-bold text-white"
              >
                {isLoading ? "Logging in..." : "Log In"}
              </Button>

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="/auth/register" className="text-[#0a1155] hover:underline">
                  Create free account
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}