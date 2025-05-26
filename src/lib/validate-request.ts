import { cookies } from "next/headers";
import { cache } from "react";

import type { Session, DatabaseUser } from "@/db";
import { validateSessionToken } from "./auth";
import { deleteSessionTokenCookie, setSessionTokenCookie } from "./cookies";


export const validateRequest = cache(
    async (): Promise<{ user: DatabaseUser; session: Session } | { user: null; session: null }> => {
        const cookieStore = await cookies();
        const sessionId = cookieStore.get("auth_session")?.value ?? null;
        if (!sessionId) {
            return {
                user: null,
                session: null
            };
        }

        const result = await validateSessionToken(sessionId);
        // next.js throws when you attempt to set cookie when rendering page
        try {
            if (result.session) {
                await setSessionTokenCookie(result.session.id, result.session.expiresAt);
            }
            if (!result.session) {
                await deleteSessionTokenCookie();
            }
        } catch { }
        return result;
    }
);
