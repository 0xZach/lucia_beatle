# Documentation for LuciaBeatle

### Introduction

Small side project to test the Lucia package on a Next.js architecture. 
The goal is to see if it can be better than Next-auth for future authentication implementations.


### Requirements

- React
- Nextjs
- Turbopack
- Typescript
- Eslint
- Lucia
- Drizzle adapter
- better-sqlite3
- bcrypt (Argon2 doesn't work with Turbopack)


### TO-DO list

#### V1 (db integrated + username/password auth):
- Setup db: 100% done (session and user are working as intended now)

- Setup nextjs architecture: 40% done (this will stay undone for a while)

- Signup route: 100% done (need to find out how to apply error messages which are sent to the void for now)

- Login route: 100% done

- Loggout route: 100% done (decided to both have its own path and make it a button available in the profile directly to see how both would work)

##### V2 (email based auth):
- change auth from username to email: 0% done

- add email verification: 0% done

- Resetting password route: 0% done

#### V3 (api based db):
- api db setup: 0% done (will do it in a separate project link: _Coming soon_)

- Switch from direct db calls to Api calls: 0% done









<sub>_(if you understand the title's reference, here's a cookie for you 🍪)_</sub>
