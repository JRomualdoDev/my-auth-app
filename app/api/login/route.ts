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

        console.log('user:::::::::::>>>>000000000 ', user);

        // const isValid = await verifyPassword(validatedData.password, user.password);

        // if(!isValid) {
        //     return NextResponse.json(
        //         {
        //             "status": 401,
        //             "error": "Invalid Credentials"
        //         }
        //     )
        // }

        // const { accessToken, refreshToken } = generateTokens(validatedData);
            

        // return NextResponse.json(
        //     {
        //         "status": "success",
        //         "accessToken": accessToken,
        //         headers: {
        //             'Set-Cookie': `refreshToken=${refreshToken}; HttpOnly; Secure; SameSite=Strict; Path=/`
        //         }
        //     }
        // )
        return NextResponse.json(
            {
                "status": 200,
                "data": 'user'
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