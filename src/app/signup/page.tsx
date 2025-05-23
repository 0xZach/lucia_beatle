import { signup } from "../actions";
import React from "react";
import RootLayout from "../layout";

const SignupPage = () => {
    return (
        <RootLayout>
            <h1>Create an account</h1>
            <form action={signup}>
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
export default SignupPage;