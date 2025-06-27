import { 
  users, 
  courseProgress, 
  quizAttempts, 
  bookmarks,
  type User, 
  type InsertUser,
  type CourseProgress,
  type InsertCourseProgress,
  type QuizAttempt,
  type InsertQuizAttempt,
  type Bookmark,
  type InsertBookmark
} from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getCourseProgress(userId: number): Promise<CourseProgress[]>;
  updateCourseProgress(progress: InsertCourseProgress): Promise<CourseProgress>;
  
  getQuizAttempts(userId: number, moduleId?: number): Promise<QuizAttempt[]>;
  createQuizAttempt(attempt: InsertQuizAttempt): Promise<QuizAttempt>;
  
  getBookmarks(userId: number): Promise<Bookmark[]>;
  createBookmark(bookmark: InsertBookmark): Promise<Bookmark>;
  deleteBookmark(id: number): Promise<void>;
  
  resetProgress(userId: number): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private courseProgress: Map<string, CourseProgress>;
  private quizAttempts: Map<number, QuizAttempt>;
  private bookmarks: Map<number, Bookmark>;
  private currentUserId: number;
  private currentProgressId: number;
  private currentQuizId: number;
  private currentBookmarkId: number;

  constructor() {
    this.users = new Map();
    this.courseProgress = new Map();
    this.quizAttempts = new Map();
    this.bookmarks = new Map();
    this.currentUserId = 1;
    this.currentProgressId = 1;
    this.currentQuizId = 1;
    this.currentBookmarkId = 1;

    // Create default user for demo
    this.createUser({ username: "student", password: "password" });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getCourseProgress(userId: number): Promise<CourseProgress[]> {
    return Array.from(this.courseProgress.values()).filter(
      (progress) => progress.userId === userId
    );
  }

  async updateCourseProgress(progress: InsertCourseProgress): Promise<CourseProgress> {
    const key = `${progress.userId}-${progress.moduleId}`;
    const existing = this.courseProgress.get(key);
    
    if (existing) {
      const updated: CourseProgress = {
        ...existing,
        ...progress,
        completedAt: progress.completed ? new Date() : existing.completedAt,
      };
      this.courseProgress.set(key, updated);
      return updated;
    } else {
      const newProgress: CourseProgress = {
        id: this.currentProgressId++,
        ...progress,
        completedAt: progress.completed ? new Date() : null,
      };
      this.courseProgress.set(key, newProgress);
      return newProgress;
    }
  }

  async getQuizAttempts(userId: number, moduleId?: number): Promise<QuizAttempt[]> {
    return Array.from(this.quizAttempts.values()).filter(
      (attempt) => attempt.userId === userId && (!moduleId || attempt.moduleId === moduleId)
    );
  }

  async createQuizAttempt(attempt: InsertQuizAttempt): Promise<QuizAttempt> {
    const id = this.currentQuizId++;
    const newAttempt: QuizAttempt = {
      ...attempt,
      id,
      attemptedAt: new Date(),
    };
    this.quizAttempts.set(id, newAttempt);
    return newAttempt;
  }

  async getBookmarks(userId: number): Promise<Bookmark[]> {
    return Array.from(this.bookmarks.values()).filter(
      (bookmark) => bookmark.userId === userId
    );
  }

  async createBookmark(bookmark: InsertBookmark): Promise<Bookmark> {
    const id = this.currentBookmarkId++;
    const newBookmark: Bookmark = {
      ...bookmark,
      id,
      createdAt: new Date(),
    };
    this.bookmarks.set(id, newBookmark);
    return newBookmark;
  }

  async deleteBookmark(id: number): Promise<void> {
    this.bookmarks.delete(id);
  }

  async resetProgress(userId: number): Promise<void> {
    // Remove all course progress for the user
    const progressKeys = Array.from(this.courseProgress.keys());
    progressKeys.forEach(key => {
      const progress = this.courseProgress.get(key);
      if (progress && progress.userId === userId) {
        this.courseProgress.delete(key);
      }
    });

    // Remove all quiz attempts for the user
    const quizKeys = Array.from(this.quizAttempts.keys());
    quizKeys.forEach(key => {
      const attempt = this.quizAttempts.get(key);
      if (attempt && attempt.userId === userId) {
        this.quizAttempts.delete(key);
      }
    });

    // Remove all bookmarks for the user
    const bookmarkKeys = Array.from(this.bookmarks.keys());
    bookmarkKeys.forEach(key => {
      const bookmark = this.bookmarks.get(key);
      if (bookmark && bookmark.userId === userId) {
        this.bookmarks.delete(key);
      }
    });
  }
}

export const storage = new MemStorage();
