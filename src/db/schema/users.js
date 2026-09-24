import { pgTable, pgEnum, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from "uuid";


export const userRoleEnum = new pgEnum("user_role", ["staff", "customer", "admin"]);


export const users = pgTable("users", {
    id: uuid("id").primaryKey().$defaultFn(() => uuidv7()),
    firstName: varchar("first_name", { length: 100 }).notNull(),
    lastName: varchar("last_name", { length: 100 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    password: varchar("password", { length: 255 }).notNull(),
    role: userRoleEnum("role").notNull().default("customer"),
    createdAt: timestamp("created_at", {withTimezone: true}).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", {withTimezone: true}).notNull().defaultNow(),
});

