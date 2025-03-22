'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios_api  from "../../lib/axios"
import { loginSchema } from "./login-schema"
import { useAuthStore } from "@/lib/store/auth-store"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);

  const { handleSubmit, register, formState:{ errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    setLoginError(null);
    
    try {
      const res = await axios_api.post('/login', data);

      if (res.status === 200) {
        // Armazenar token no Zustand store
        setAuth(res.data.accessToken, {
          id: res.data.userId || '',
          name: res.data.name,
          email: data.email
        });
        
        // Usar router para navegação
        router.push('/private/dashboard');
      }
    } catch (error: unknown) {
      if (axios_api.isAxiosError(error)) {
        setLoginError('Login failed. Please try again.');
      } else {
        setLoginError('An unexpected error occurred');
        // console.error(error);
      }
    }
  }

  // Resto do componente permanece o mesmo
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            {loginError && (
              <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                {loginError}
              </div>
            )}
            <div className="flex flex-col gap-6">
              {/* Resto do formulário permanece o mesmo */}
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email", { required: true })}
                  type="email"
                  aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input 
                  {...register("password")}
                  type="password" 
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
