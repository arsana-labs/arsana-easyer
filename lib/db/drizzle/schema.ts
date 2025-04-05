import { pgTable, text, timestamp, json, boolean } from "drizzle-orm/pg-core"

export const users = pgTable("User", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  firstName: text("firstName"),
  lastName: text("lastName"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
})

export const diagrams = pgTable("Diagram", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  content: json("content").notNull(),
  notation: text("notation").notNull().default("crowsfoot"),
  isPublic: boolean("isPublic").notNull().default(false),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
})

