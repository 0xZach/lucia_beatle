# Installation guide

## Requirement

Node.js version ^22.14

## Steps

#### dependencies installation:

```
$npm install
```


#### DB setup:

In the root folder, create a file named 'sqlite.db'. Then, use any sqlite db management tool to add the tables described in 'db/schema.ts'.
(used "db browser for sqlite" for this project)


#### Run in dev mode:

```
npm run dev
```

Check-out the website at localhost:3000/