"use server";

import { db } from "@/db";
import bcrypt, { compareSync } from "bcrypt";
import { redirect } from "next/navigation";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { validateRequest } from "@/lib/validate-request";
import { createSession, generateSessionToken, invalidateSession, generateIdFromEntropySize } from "@/lib/auth";
import { deleteSessionTokenCookie, setSessionTokenCookie } from "@/lib/cookies";
import { isValidEmail } from "@/helper/mail";


export async function signup(currentState: { error: string }, formData: FormData) {

    // Email verification
    const email = formData.get("email");
    if (
        typeof email !== "string" ||
        email.length < 3 ||
        email.length > 31 ||
        !isValidEmail(email)
    ) {
        return {
            error: "Invalid email address"
        };
    }

    // Password verification
    const password = formData.get("password");
    if (typeof password !== "string" || password.length < 6 || password.length > 255) {
        return {
            error: "Invalid password"
        };
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const userId = generateIdFromEntropySize(10); // 16 characters long


    const existingUser = db.select().from(userTable).where(eq(userTable.email, email)).limit(1).get();
    if (existingUser) {
        return {
            error: "this email address is already in use!"
        };
    }

    await db.insert(userTable).values({
        id: userId,
        email: email,
        password_hash: hash
    });

    const token = generateSessionToken();
    const session = await createSession(token, userId);
    await setSessionTokenCookie(token, session.expiresAt); // use token since session.id is only the hashed version

    return redirect("/");
}


export async function login(currentState: { error: string }, formData: FormData) {
    // Email verification
    const email = formData.get("email");
    if (
        typeof email !== "string" ||
        email.length < 3 ||
        email.length > 31 ||
        !isValidEmail(email)
    ) {
        return {
            error: "Invalid email address"
        };
    }

    // Password verification
    const password = formData.get("password");
    if (typeof password !== "string" || password.length < 6 || password.length > 255) {
        return {
            error: "Invalid password"
        };
    }

    const existingUser = db.select().from(userTable).where(eq(userTable.email, email)).limit(1).get();
    if (!existingUser) {
        // NOTE:
        // Returning immediately allows malicious actors to figure out valid emails from response times,
        // allowing them to only focus on guessing passwords in brute-force attacks.
        // As a preventive measure, you may want to hash passwords even for invalid emails.
        // However, valid emails can be already be revealed with the signup page
        // and a similar timing issue can likely be found in password reset implementation.
        // It will also be much more resource intensive.
        // Since protecting against this is non-trivial,
        // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
        // If emails/usernames are public, you may outright tell the user that the username is invalid.
        return {
            error: "Incorrect address or password"
        };
    }

    const validPassword = compareSync(password, existingUser.password_hash);
    if (!validPassword) {
        return {
            error: "Incorrect email or password"
        };
    }

    const token = generateSessionToken();
    const session = await createSession(token, existingUser.id);
    await setSessionTokenCookie(token, session.expiresAt);
    return redirect("/");
}


export async function logout() {
    "use server";
    const { session } = await validateRequest();
    if (!session) {
        return redirect("/login");
    }

    await invalidateSession(session.id);

    await deleteSessionTokenCookie();
    return redirect("/login");
}


export async function oldLogout(currentState: { error: string }) {
    "use server";
    const { session } = await validateRequest();
    if (!session) {
        return {
            error: "Unauthorized"
        };
    }

    await invalidateSession(session.id);

    await deleteSessionTokenCookie();
    return redirect("/");
}