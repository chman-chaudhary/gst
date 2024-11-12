"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
    message: "Invalid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export default function LoginForm() {
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
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (!response?.error) {
        toast({
          title: "User logged in successfully.",
          description: "You will be redirected to the dashboard.",
        });
        router.push("/dashboard");
      }

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Process response here
    } catch (error) {
      console.error("Login Failed:", error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center text-3xl">Login to GST</CardTitle>
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
                      className="text-base"
                      placeholder="youremail@domain.com"
                      {...field}
                      type="text"
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
            <Button
              type="submit"
              className="w-full text-base"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Logging...." : "Login"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <CardDescription className="flex justify-center w-full gap-x-1">
          Don't have an account?
          <Link href={"/register"} className="text-primary hover:underline">
            Sign Up
          </Link>
        </CardDescription>
      </CardFooter>
    </Card>
  );
}
