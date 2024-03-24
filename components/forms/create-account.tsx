'use client';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/firestore";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from '../ui/input';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from "next/navigation";
import { redirect } from 'next/navigation'

const formSchema = z.object({
    email: z.string().email({ message: "Enter a valid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  }); 
type UserFormValue = z.infer<typeof formSchema>;

export default function CreateAccount() {
    const router = useRouter()
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl");
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

  const handleSignUp: SubmitHandler<UserFormValue> = async (data: UserFormValue) => {

    
    try {
        await createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential) => {
          if (userCredential.user) {
            router.push('/')
          }
          
        })
    } catch (error) {
      console.error(error);

    }
  };
  const defaultValues = {
    email: "",
    password: "",
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  return (
    <Form {...form}>
    <form
      onSubmit={form.handleSubmit(handleSignUp)}
      className="space-y-2 w-full"
    >
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="Enter your email..."
                disabled={loading}
                {...field}
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
                disabled={loading}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Button disabled={loading} className="ml-auto w-full" type="submit">
        Create Account
      </Button>
    </form>
  </Form>
    
  );
}

