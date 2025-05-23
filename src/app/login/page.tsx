'use client';

import { login } from "../actions";
import React, { useActionState } from "react";
import RootLayout from "../layout";

const LoginPage = () => {
    const initialState = {
        error: ''
    };
    const [formState, formAction] = useActionState(login, initialState);
    return (
        <RootLayout>
            <h1>Sign in</h1>
            <form action={formAction}>
                <label htmlFor="username">Username</label>
                <input name="username" id="username" />
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <br />
                <button>Continue</button>
                {formState?.error &&
                    <p>{formState.error}</p>
                }
            </form>
        </RootLayout>
    );
}

export default LoginPage; 
