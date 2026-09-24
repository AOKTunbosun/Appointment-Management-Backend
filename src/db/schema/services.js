import { pgTable, uuid, boolean, integer, varchar, timestamp } from "drizzle-orm/pg-core";
import { v7 as uuidv7 } from "uuid";

export const services = pgTable("services", {
    id: uuid("id").primaryKey().$defaultFn(() => uuidv7()),
    name: varchar("name", { length: 100 }).notNull(),
    description: varchar("description", { length: 255 }).notNull(),
    averageDuration: integer("average_duration").notNull(),
    dailyCapacity: integer("daily_capacity").notNull(),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});