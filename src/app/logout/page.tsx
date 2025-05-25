'use client';

import { logout } from "../actions";
import React, { useActionState } from "react";
import RootLayout from "../layout";

const LogoutPage = () => {
    const initialState = {
        error: ''
    };
    const [formState, formAction] = useActionState(logout, initialState);
    return (
        <RootLayout>
            {formState?.error &&
                <p>{formState.error}</p>
            }
            {!formState?.error &&
                <form action={formAction}>
                    <button type="submit">Sign out</button>
                </form>
            }

        </RootLayout>
    );
}

export default LogoutPage;
