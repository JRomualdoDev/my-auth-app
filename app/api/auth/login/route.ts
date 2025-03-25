import { NextResponse } from 'next/server';
import { loginSchema } from '@/components/login/login-schema';
import { generateTokens, verifyPassword } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { generateCsrfToken } from '@/lib/csrf';

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
                    "error": "Invalid Credentials"
                },
                { status: 401 }
            )
        }
        const isValid = await verifyPassword(validatedData.password, user.password);

        if(!isValid) {
            return NextResponse.json(
                {
                    "error": "Invalid Credentials"
                },
                { status: 401 }
            )
        }

        const { accessToken, refreshToken } = generateTokens({ id: user.id, email: user.email });
        
        // Gerar um token CSRF
        const csrfToken = generateCsrfToken();
            
        return NextResponse.json(
            {
                "status": "success",
                "user": {
                    "name": user.name,
                    "email": user.email,
                },
                "accessToken": accessToken,
                // "csrfToken": csrfToken 
            },
            {
                status: 200,
                headers: {
                    // Definir os cookies separadamente
                    'Set-Cookie': `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800, csrf_token=${csrfToken}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=604800`
                }
            }
        )
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch(error)
    {
        return NextResponse.json(
            {              
                "error": "Server Error"
            },
            { status: 500 }
        )
    }   
}