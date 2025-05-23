import React from 'react';
import RootLayout from './layout';

const Page = () => {
  return (
    <RootLayout>
      <h1>Home</h1>
      <a href='/signup'>Signup</a>
    </RootLayout>
  );
}

export default Page;
