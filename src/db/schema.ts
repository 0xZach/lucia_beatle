import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("userTable", {
    id: text("id").primaryKey(),
    username: text("username").notNull(),
    password_hash: text("password_hash").notNull()
});

export const sessionTable = sqliteTable("sessionTable", {
    id: text("id").primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id),
    expiresAt: integer("expires_at").notNull()
});

