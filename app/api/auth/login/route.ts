import { NextResponse } from 'next/server';
import { loginSchema } from '@/components/login/login-schema';
import { generateTokens} from '@/lib/auth';
import { generateCsrfToken } from '@/lib/csrf';
import { authenticateUser } from '@/services/auth-service';
import { AUTH_ERRORS } from '@/constants/error-messages';

export async function POST(request: Request) {
    const body = await request.json()

    try {
        const validatedData = loginSchema.parse(body);

        const user = await authenticateUser(validatedData);

        if(!user) {
            return NextResponse.json(
                {
                    "error": AUTH_ERRORS.INVALID_CREDENTIALS
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
                "error": AUTH_ERRORS.SERVER_ERROR
            },
            { status: 500 }
        )
    }   
}