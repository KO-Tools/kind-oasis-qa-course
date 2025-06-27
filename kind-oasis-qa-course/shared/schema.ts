import { pgTable, text, serial, integer, boolean, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const courseProgress = pgTable("course_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  moduleId: integer("module_id").notNull(),
  completed: boolean("completed").default(false),
  quizScore: integer("quiz_score"),
  completedAt: timestamp("completed_at"),
});

export const quizAttempts = pgTable("quiz_attempts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  moduleId: integer("module_id").notNull(),
  answers: json("answers").$type<Record<string, string>>().notNull(),
  score: integer("score").notNull(),
  passed: boolean("passed").notNull(),
  attemptedAt: timestamp("attempted_at").defaultNow(),
});

export const bookmarks = pgTable("bookmarks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  moduleId: integer("module_id").notNull(),
  sectionId: text("section_id").notNull(),
  title: text("title").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCourseProgressSchema = createInsertSchema(courseProgress).omit({
  id: true,
  completedAt: true,
});

export const insertQuizAttemptSchema = createInsertSchema(quizAttempts).omit({
  id: true,
  attemptedAt: true,
});

export const insertBookmarkSchema = createInsertSchema(bookmarks).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type CourseProgress = typeof courseProgress.$inferSelect;
export type InsertCourseProgress = z.infer<typeof insertCourseProgressSchema>;
export type QuizAttempt = typeof quizAttempts.$inferSelect;
export type InsertQuizAttempt = z.infer<typeof insertQuizAttemptSchema>;
export type Bookmark = typeof bookmarks.$inferSelect;
export type InsertBookmark = z.infer<typeof insertBookmarkSchema>;
