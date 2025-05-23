'use client';

import { signup } from "../actions";
import React, { useActionState } from "react";
import RootLayout from "../layout";

const SignupPage = () => {
    const initialState = {
        error: ''
    };
    const [formState, formAction] = useActionState(signup, initialState);

    return (
        <RootLayout>
            <h1>Create an account</h1>
            <form action={formAction}>
                <label htmlFor="username">Username</label>
                <input name="username" id="username" />
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <br />
                <button type="submit">Register </button>
                {formState?.error &&
                    <p>{formState.error}</p>
                }
            </form>
        </RootLayout>
    );
}
export default SignupPage;