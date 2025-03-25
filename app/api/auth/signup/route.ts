import { signUpSchema } from "@/components/sign-up/signup-schema";
import { hashPassword } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();

    try {
        const validateData = signUpSchema.parse(body);

        const user = await prisma.user.create({
            data: {
                name: validateData.name,
                email: validateData.email,
                password: await hashPassword(validateData.password)
            }
        });
        return NextResponse.json(
            {
                "message": "User Created"
            },
            { status: 201 }
        )
    }
    catch (error: unknown) {

        if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
            return NextResponse.json(
                {
                    "message": "Email already exists. Please use a different email address."
                },
                { status: 409 } // 409 Conflict is appropriate for duplicate resource
            )
        }

        return NextResponse.json(
            {              
                "error": "Internal Server Error"
            },
            { status: 500 }
        )
    }

    return NextResponse.json(body);
}