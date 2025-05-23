import { drizzle } from 'drizzle-orm/better-sqlite3';
import sqlite from 'better-sqlite3';

const sqliteDB = sqlite("sqlite.db");
export const db = drizzle(sqliteDB);

export interface DatabaseUser {
    id: string;
    username: string;
    password: string;
};