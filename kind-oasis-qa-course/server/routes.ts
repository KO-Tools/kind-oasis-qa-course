import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCourseProgressSchema, insertQuizAttemptSchema, insertBookmarkSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Default user ID for demo (in real app, would come from authentication)
  const DEFAULT_USER_ID = 1;

  // Get course progress
  app.get("/api/progress", async (req, res) => {
    try {
      const progress = await storage.getCourseProgress(DEFAULT_USER_ID);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch progress" });
    }
  });

  // Update course progress
  app.post("/api/progress", async (req, res) => {
    try {
      const data = insertCourseProgressSchema.parse({
        ...req.body,
        userId: DEFAULT_USER_ID,
      });
      const progress = await storage.updateCourseProgress(data);
      res.json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update progress" });
      }
    }
  });

  // Get quiz attempts
  app.get("/api/quiz-attempts/:moduleId?", async (req, res) => {
    try {
      const moduleId = req.params.moduleId ? parseInt(req.params.moduleId) : undefined;
      const attempts = await storage.getQuizAttempts(DEFAULT_USER_ID, moduleId);
      res.json(attempts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz attempts" });
    }
  });

  // Submit quiz attempt
  app.post("/api/quiz-attempts", async (req, res) => {
    try {
      const data = insertQuizAttemptSchema.parse({
        ...req.body,
        userId: DEFAULT_USER_ID,
      });
      const attempt = await storage.createQuizAttempt(data);
      
      // Also update course progress if quiz passed
      if (attempt.passed) {
        await storage.updateCourseProgress({
          userId: DEFAULT_USER_ID,
          moduleId: attempt.moduleId,
          completed: true,
          quizScore: attempt.score,
        });
      }
      
      res.json(attempt);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to submit quiz" });
      }
    }
  });

  // Get bookmarks
  app.get("/api/bookmarks", async (req, res) => {
    try {
      const bookmarks = await storage.getBookmarks(DEFAULT_USER_ID);
      res.json(bookmarks);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch bookmarks" });
    }
  });

  // Create bookmark
  app.post("/api/bookmarks", async (req, res) => {
    try {
      const data = insertBookmarkSchema.parse({
        ...req.body,
        userId: DEFAULT_USER_ID,
      });
      const bookmark = await storage.createBookmark(data);
      res.json(bookmark);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create bookmark" });
      }
    }
  });

  // Delete bookmark
  app.delete("/api/bookmarks/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteBookmark(id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete bookmark" });
    }
  });

  // Reset progress
  app.post("/api/reset-progress", async (req, res) => {
    try {
      await storage.resetProgress(DEFAULT_USER_ID);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to reset progress" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
