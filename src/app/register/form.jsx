"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const FormSchema = z.object({
  email: z.string().email({
    message: "Please provide valid email.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function FormPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      toast({
        title: "User registered successfully.",
        description: "You'll be redirected to Login page",
      });
      router.push("/login");
      //   toast({ title: "Registration Successful" });
    } catch (error) {
      console.error("Registration Failed:", error);
      //   toast({ title: "Registration Failed", description: error.message });
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-3xl">Sign up to GST</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form} className="w-2/3">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="px-8 py-4 space-y-5"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="youremail@domain.com"
                      className="text-base"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      className="text-base"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-5 w-full">
              Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <CardDescription className="flex justify-center w-full gap-x-1">
          Already have an account?
          <Link href={"/login"} className="text-primary hover:underline">
            Login
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
