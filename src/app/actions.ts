import db from "../db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { lucia } from "../lib/auth";
import { redirect } from "next/navigation";
import { generateIdFromEntropySize } from "lucia";
//import { ActionResult } from "next/dist/server/app-render/types";
import { userTable } from "../db/schema";

export async function signup(formData: FormData): Promise<any> {
    "use server";
    const username = formData.get("username");
    // username must be between 4 ~ 31 characters, and only consists of lowercase letters, 0-9, -, and _
    // keep in mind some database (e.g. mysql) are case insensitive
    if (
        typeof username !== "string" ||
        username.length < 3 ||
        username.length > 31 ||
        !/^[a-z0-9_-]+$/.test(username)
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

    const bcryptPassHash = () => {
        const saltRounds = 10; // typical value is between 10 and 12
        let res = "";
        bcrypt.genSalt(saltRounds, (err, salt) => {
            if (err) {
                // Handle error
                return;
            }
            const userPassword = 'user_password'; // Replace with the actual password
            bcrypt.hash(userPassword, salt, (err, hash) => {
                if (err) {
                    // Handle error
                    return;
                }

                // Hashing successful, 'hash' contains the hashed password
                // console.log('Hashed password:', hash);
                res = hash;
            });
            // Salt generation successful, proceed to hash the password
        });

        return res;
    };

    const hashed_pass = bcryptPassHash();
    const userId = generateIdFromEntropySize(10); // 16 characters long

    try {
        // TODO: check if username is already used
        await db.insert(userTable).values({
            id: userId,
            username: username,
            password_hash: hashed_pass
        });

    } catch (error) {
        return error;
    }

    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    const cookieStore = await cookies();
    cookieStore.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return redirect("/");
}
