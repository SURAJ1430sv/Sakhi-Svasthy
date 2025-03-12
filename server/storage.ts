import { periodData, users, type User, type InsertUser, type PeriodData, type InsertPeriodData } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Period tracking
  getPeriodDataForUser(userId: number): Promise<PeriodData[]>;
  createPeriodData(userId: number, data: InsertPeriodData): Promise<PeriodData>;
  updatePeriodData(id: number, data: Partial<InsertPeriodData>): Promise<PeriodData | undefined>;
  deletePeriodData(id: number): Promise<boolean>;
  
  // Session store for authentication
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private periods: Map<number, PeriodData>;
  public sessionStore: session.Store;
  private currentUserId: number;
  private currentPeriodId: number;

  constructor() {
    this.users = new Map();
    this.periods = new Map();
    this.currentUserId = 1;
    this.currentPeriodId = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000,
    });
  }

  // User methods
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
    const createdAt = new Date();
    const user: User = { ...insertUser, id, createdAt };
    this.users.set(id, user);
    return user;
  }

  // Period data methods
  async getPeriodDataForUser(userId: number): Promise<PeriodData[]> {
    return Array.from(this.periods.values()).filter(
      (period) => period.userId === userId,
    );
  }

  async createPeriodData(userId: number, data: InsertPeriodData): Promise<PeriodData> {
    const id = this.currentPeriodId++;
    const periodEntry: PeriodData = { ...data, id, userId };
    this.periods.set(id, periodEntry);
    return periodEntry;
  }

  async updatePeriodData(id: number, data: Partial<InsertPeriodData>): Promise<PeriodData | undefined> {
    const existingPeriod = this.periods.get(id);
    if (!existingPeriod) return undefined;

    const updatedPeriod = { ...existingPeriod, ...data };
    this.periods.set(id, updatedPeriod);
    return updatedPeriod;
  }

  async deletePeriodData(id: number): Promise<boolean> {
    return this.periods.delete(id);
  }
}

export const storage = new MemStorage();
