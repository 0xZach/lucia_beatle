"use server";

import { db } from "@/db";
import bcrypt, { compareSync } from "bcrypt";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { validateRequest } from "@/lib/validate-request";
import { createSession, generateSessionToken, invalidateSession } from "@/lib/auth";
import { deleteSessionTokenCookie, setSessionTokenCookie } from "@/lib/cookies";


export async function signup(currentState: { error: string }, formData: FormData) {
    const username = formData.get("username");
    // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
    // keep in mind some database (e.g. mysql) are case insensitive
    if (
        typeof username !== "string" ||
        username.length < 3 ||
        username.length > 31 ||
        !/^[a-zA-Z0-9_-]+$/.test(username)
    ) {
        return {
            error: "Invalid username"
        };
    }
    const password = formData.get("password");
    if (typeof password !== "string" || password.length < 6 || password.length > 255) {
        return {
            error: "Invalid password"
        };
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const userId = generateIdFromEntropySize(10); // 16 characters long

    // TODO: check if username is already used
    await db.insert(userTable).values({
        id: userId,
        username: username,
        password_hash: hash
    });

    const token = generateSessionToken();
    const session = await createSession(token, userId);
    await setSessionTokenCookie(token, session.expiresAt); // use token since session.id is only the hashed version

    return redirect("/");
}


export async function login(currentState: { error: string }, formData: FormData) {
    const username = formData.get("username");
    if (
        typeof username !== "string" ||
        username.length < 3 ||
        username.length > 31 ||
        !/^[a-zA-Z0-9_-]+$/.test(username)
    ) {
        return {
            error: "Invalid username"
        };
    }
    const password = formData.get("password");
    if (typeof password !== "string" || password.length < 6 || password.length > 255) {
        return {
            error: "Invalid password"
        };
    }

    const existingUser = db.select().from(userTable).where(eq(userTable.username, username)).limit(1).get();
    if (!existingUser) {
        console.log("boop");
        // NOTE:
        // Returning immediately allows malicious actors to figure out valid usernames from response times,
        // allowing them to only focus on guessing passwords in brute-force attacks.
        // As a preventive measure, you may want to hash passwords even for invalid usernames.
        // However, valid usernames can be already be revealed with the signup page among other methods.
        // It will also be much more resource intensive.
        // Since protecting against this is non-trivial,
        // it is crucial your implementation is protected against brute-force attacks with login throttling etc.
        // If usernames are public, you may outright tell the user that the username is invalid.
        return {
            error: "Incorrect username or password"
        };
    }

    const validPassword = compareSync(password, existingUser.password_hash);
    if (!validPassword) {
        return {
            error: "Incorrect username or password"
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