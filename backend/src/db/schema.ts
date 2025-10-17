import { boolean, integer, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const identityProviders = pgEnum("identity_providers", [
	"google",
	"facebook",
])

export const userTable = pgTable("users", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	email: text("email").unique().notNull(),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
	approved: boolean("approved").notNull().default(false),
})

export const userIdentities = pgTable("user_identities", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	userId: integer("user_id").notNull().references(() => userTable.id),
	provider: identityProviders("provider").notNull(),
	sub: text("sub").unique().notNull(),
})

export const sessionTable = pgTable("sessions", {
	id: text("id").notNull().primaryKey(),
	userId: integer("user_id").notNull().references(() => userTable.id),
	expiresAt: timestamp("expires_at", { mode: "date" }).notNull(),
})

export const employeeTable = pgTable("employees", {
	id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
	name: text("name").notNull(),
	role: text("role"),
	imageSrc: text("image_src")
})
