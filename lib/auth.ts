
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

export async function hashPassword(password: string) {
    return bcryptjs.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string) {
    return bcryptjs.compare(password, hashedPassword);
}

interface User {
    email: string;
    password: string;
}	

export function generateTokens(user: User) {

    const accessTokenSecret = process.env.JWT_ACCESS_SECRET;
    const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;

    if (!accessTokenSecret || !refreshTokenSecret) {
        throw new Error("JWT secret is not defined");
    }

    const accessToken = jwt.sign(user, accessTokenSecret , {expiresIn: "15m"});
    const refreshToken = jwt.sign(user, refreshTokenSecret , {expiresIn: "7d"});

    return {
        accessToken,
        refreshToken
    }
}
