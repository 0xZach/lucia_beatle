import RootLayout from './layout';
import { validateRequest } from '@/lib/validate-request';
//import Link from 'next/link';
import { logout } from "./actions";
import React from "react";
import { redirect } from 'next/navigation';

async function Page() {
  const { user } = await validateRequest();
  if (!user) {
    return redirect("/login");
  }
  return (
    <RootLayout>
      <h1>Home</h1>
      {user && <p>Welcome to your profile!</p>}

      {user &&
        <form action={logout}>
          <button type="submit">Sign out</button>
        </form>
      }


    </RootLayout>
  );
}

// {!user && <Link href="/login">Login</Link>}<br /><br />
// {!user && <Link href="/signup">Signup</Link>}

export default Page;
