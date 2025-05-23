import { login } from "../actions";
import React from "react";
import RootLayout from "../layout";

async function LoginPage() {
    return (
        <RootLayout>
            <h1>Sign in</h1>
            <form action={login}>
                <label htmlFor="username">Username</label>
                <input name="username" id="username" />
                <br />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" />
                <br />
                <button>Continue</button>
            </form>
        </RootLayout>
    );
}

export default LoginPage; 
