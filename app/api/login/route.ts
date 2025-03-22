import { NextResponse } from 'next/server';
import { loginSchema } from '@/components/edit/login-schema';
import { generateTokens, verifyPassword } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(request: Request) {
    const body = await request.json()

    try {
        const validatedData = loginSchema.parse(body);

        const user = await prisma.user.findUnique({
            where: {
                email: validatedData.email
            }
        });

        if(!user) {
            return NextResponse.json(
                {
                    "status": 401,
                    "error": "User not found"
                },
                { status: 401 }
            )
        }
        const isValid = await verifyPassword(validatedData.password, user.password);

        if(!isValid) {
            return NextResponse.json(
                {
                    "status": 401,
                    "error": "Invalid Credentials"
                }
            )
        }

        const { accessToken, refreshToken } = generateTokens(validatedData);
            
        return NextResponse.json(
            {
                "status": "success",
                "user": {
                    "name": user.name,
                    "email": user.email,
                },
                "accessToken": accessToken
            },
            {
                status: 200,
                headers: {
                    // Set the cookie header for the refresh token
                    // Flag secure to true to ensure the cookie is only sent over HTTPS
                    // SameSite is set to Strict to prevent CSRF attacks
                    // Max-age is 7 days in seconds
                    'Set-Cookie': `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`
                }
            }
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch(error)
    {
        return NextResponse.json(
            {
                "status": 500,
                "error": "Server Error"
            }
        )
    }   
}