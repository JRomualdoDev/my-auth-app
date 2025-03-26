import { NextResponse } from "next/server";

export async function POST() {
    const response = NextResponse.json({
        success: true
    });

    response.cookies.set('refreshToken', '', {
        httpOnly: true,
        expires: new Date(0),
        path: '/',
        sameSite: 'strict',
        // secure: process.env.NODE_ENV === 'production'
        secure: true
    });

    response.cookies.set('csrf_token', '', {
        httpOnly: true,
        expires: new Date(0),
        path: '/',
        sameSite: 'strict',
        // secure: process.env.NODE_ENV === 'production'
        secure: true
    });

    return response;
}