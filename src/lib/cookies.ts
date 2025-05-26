import { cookies } from "next/headers";
import "server-only";


export async function setSessionTokenCookie(token: string, expiresAt: number): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set("auth_session", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt,
        path: "/"
    });
}

export async function deleteSessionTokenCookie(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set("auth_session", "", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
        path: "/"
    });
}