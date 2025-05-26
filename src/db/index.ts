import { drizzle } from 'drizzle-orm/better-sqlite3';
import sqlite from 'better-sqlite3';
import { sessionTable, userTable } from './schema';

const sqliteDB = sqlite("sqlite.db");
export const db = drizzle({
    client: sqliteDB,
    schema: {
        userTable,
        sessionTable
    }
});

export interface User {
    id: string;
    email: string;
    password_hash: string;
};

export interface Session {
    id: string;
    userId: string;
    expiresAt: number;
};