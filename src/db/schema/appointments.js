import {
    pgTable,
    pgEnum,
    uuid,
    date,
    time,
    varchar,
    timestamp,
    integer,
} from "drizzle-orm/pg-core";

import { v7 as uuidv7 } from "uuid";

import { users } from "./users.js";
import { services } from "./services.js";


export const appointmentStatusEnum = pgEnum("appointment_status", [
    "pending",
    "confirmed",
    "checked_in",
    "in_service",
    "completed",
    "cancelled",
    "no_show",
]);


export const appointments = pgTable("appointments", {
    id: uuid('id').primaryKey().$defaultFn(() => uuidv7()),
    customerId: uuid('customer_id').notNull().references(() => users.id),
    serviceId: uuid('service_id').notNull().references(() => services.id),
    appointmentDate: date('appointment_date').notNull(),
    appointmentTime: time('appointment_time').notNull(),
    status: appointmentStatusEnum('status', { length: 20 }).notNull().default('pending'),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});