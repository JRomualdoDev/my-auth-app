import { SignUpData, LoginData } from '@/types/auth';
import prisma from '@/lib/prisma';
import { hashPassword, verifyPassword } from '@/lib/auth';

export async function createUser(userData: SignUpData) {
    return await prisma.user.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: await hashPassword(userData.password)
        }
    });
}

export async function authenticateUser(loginData: LoginData) {
    const user = await prisma.user.findUnique({
        where: { email: loginData.email }
    });
    
    if (!user) return null;
    
    const isValidPassword = await verifyPassword(loginData.password, user.password);
    if (!isValidPassword) return null;
    
    return user;
}