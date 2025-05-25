import React from 'react';
import RootLayout from './layout';
import { validateRequest } from '@/lib/validate-request';
import Link from 'next/link';

async function Page() {
  const { user } = await validateRequest();
  return (
    <RootLayout>
      <h1>Home</h1>
      {user && <p>Hello {user.username}!</p>}
      {user && <Link href="/logout">Logout</Link>}
      {!user && <Link href="/login">Login</Link>}<br /><br />
      {!user && <Link href="/signup">Signup</Link>}
    </RootLayout>
  );
}

export default Page;
