# Features of the website

Here you will find explanations for all the features in the website.

## Overview
This project is an authentication system using the package Lucia. it is comprised of a log-in, sign-in and profile page.

## concepts
To authenticate, we use actions (kept in the file /src/app/actions.ts). Those actions verify inputs, call db and set session cookies.

### Noteable function:

- lib/validate-request.ts
This function caches cookies and is used to determine where to redirect users who are or aren't logged in.
