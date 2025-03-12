import { pgTable, text, serial, integer, boolean, date, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const periodData = pgTable("period_data", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  startDate: date("start_date").notNull(),
  endDate: date("end_date"),
  cycleLength: integer("cycle_length"),
  symptoms: text("symptoms"),
});

export const healthAssessment = pgTable("health_assessment", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  age: integer("age").notNull(),
  condition: text("condition").notNull(), // 'pcos', 'pcod', or 'breast_cancer'
  responses: text("responses").notNull(), // JSON string of responses
  riskScore: integer("risk_score").notNull(),
  recommendations: text("recommendations").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// User schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  name: true,
});

export const loginUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

// Period data schemas
export const insertPeriodDataSchema = createInsertSchema(periodData).pick({
  startDate: true,
  endDate: true,
  cycleLength: true,
  symptoms: true,
}).omit({ userId: true });

// Health assessment schemas
export const healthAssessmentSchema = z.object({
  age: z.number().int().min(1, "Age is required").max(120),
  condition: z.enum(["pcos", "pcod", "breast_cancer"]),
  responses: z.record(z.string(), z.union([z.string(), z.number(), z.boolean()])),
});

export const insertHealthAssessmentSchema = createInsertSchema(healthAssessment).pick({
  age: true,
  condition: true,
  responses: true,
  riskScore: true,
  recommendations: true,
}).omit({ userId: true });

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type LoginUser = z.infer<typeof loginUserSchema>;
export type InsertPeriodData = z.infer<typeof insertPeriodDataSchema>;
export type PeriodData = typeof periodData.$inferSelect;
export type HealthAssessmentInput = z.infer<typeof healthAssessmentSchema>;
export type InsertHealthAssessment = z.infer<typeof insertHealthAssessmentSchema>;
export type HealthAssessment = typeof healthAssessment.$inferSelect;
