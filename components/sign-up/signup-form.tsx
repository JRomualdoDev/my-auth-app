'use client'

import { signUpSchema } from '@/components/sign-up/signup-schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axios_api from '@/lib/axios';
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function SignUpForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<'div'>) {
    const [signInError, setSignInError] = useState<string | null>(null);
    const router = useRouter();

    const { handleSubmit, register, formState: { errors} } = useForm({
        resolver: zodResolver(signUpSchema)
    });

    async function onSubmit(data: z.infer<typeof signUpSchema>) {
        console.log(data)
        setSignInError(null);

        try {
            const res = await axios_api.post('/auth/signup', data);

            if (res.status === 201) {               
                router.push('/');
            }
        } catch(error: unknown) {
            if (axios_api.isAxiosError(error)){
                setSignInError((error.response?.data as { message?: string })?.message || 'An error occurred during sign up');
            } else {
                setSignInError('An unexpected error occurred');
                // console.error(error);
            }
        }        
    }

    return (
       <div className={cn("flex flex-col gap-6", className)} { ...props }>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Sign In</CardTitle>
                    <CardDescription>
                        Sign In to your account to continue
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form 
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {signInError && (
                            <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                                {signInError}
                            </div>
                        )}
                        <div className="flex flex-col gap-6">
                            <div className='grid gap-2'>
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    {...register("name", { required: true})}
                                    type="text"
                                    aria-invalid={errors.name? "true" : "false"}
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">{errors.name.message}</p>
                                )}
                            </div>
                            <div className='grid gap-2'>
                                <Label htmlFor="name">Last Name</Label>
                                <Input
                                    {...register("lastname", { required: true})}
                                    type="text"
                                    aria-invalid={errors.lastname? "true" : "false"}
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-500">{errors.lastname?.message}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    {...register("email", { required: true })}
                                    type="email"
                                    aria-invalid={errors.email? "true" : "false"}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    {...register("password")}
                                    type="password"
                                    aria-invalid={errors.password? "true" : "false"}
                                />
                                {errors.password && (
                                    <p className="text-sm text-red-500">{errors.password.message}</p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="password">Confirm Password</Label>
                                <Input
                                    {...register("confirmation_password")}
                                    type="password"
                                    aria-invalid={errors.confirmation_password? "true" : "false"}
                                />
                                {errors.confirmation_password && (
                                    <p className="text-sm text-red-500">{errors.confirmation_password.message}</p>
                                )}
                            </div>
                            <Button type="submit" className="w-full">
                                Sign In
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
       </div>
    )
}
