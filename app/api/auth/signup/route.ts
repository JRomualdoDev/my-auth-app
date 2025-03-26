import { signUpSchema } from "@/components/sign-up/signup-schema";
import { AUTH_ERRORS } from "@/constants/error-messages";
import { createUser } from "@/services/auth-service";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const body = await request.json();

    try {
        // Validar dados com Zod
        const validatedData = signUpSchema.parse(body);
        
        // Criar usuário
        await createUser(validatedData);
        
        return NextResponse.json(
            { message: "User Created" },
            { status: 201 }
        );
    }
    catch (error: unknown) {
        return handleSignupError(error);
    }
}

// Função para tratar erros - melhora legibilidade
function handleSignupError(error: unknown) {
    // Tratar erro de email duplicado
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        return NextResponse.json(
            { message: AUTH_ERRORS.EMAIL_EXISTS },
            { status: 409 }
        );
    }
    
    return NextResponse.json(
        { error: AUTH_ERRORS.SERVER_ERROR },
        { status: 500 }
    );
}