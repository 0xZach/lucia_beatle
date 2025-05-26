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
                <label htmlFor="email">email</label>
                <input name="email" id="email" />
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <br />
                <button>Continue</button>
                {formState?.error &&
                    <p>{formState.error}</p>
                }
            </form>
            <p>New user? </p><a href='/signup'>Create an account</a>
        </RootLayout>
    );
}

export default LoginPage; 
