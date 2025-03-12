import { 
  periodData, 
  users, 
  healthAssessment,
  type User, 
  type InsertUser, 
  type PeriodData, 
  type InsertPeriodData,
  type HealthAssessment,
  type InsertHealthAssessment
} from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";
import connectPg from "connect-pg-simple";
import { db } from "./db";
import { eq } from "drizzle-orm";

const MemoryStore = createMemoryStore(session);
const PostgresSessionStore = connectPg(session);

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Period tracking
  getPeriodDataForUser(userId: number): Promise<PeriodData[]>;
  createPeriodData(userId: number, data: InsertPeriodData): Promise<PeriodData>;
  updatePeriodData(id: number, data: Partial<InsertPeriodData>): Promise<PeriodData | undefined>;
  deletePeriodData(id: number): Promise<boolean>;
  
  // Health assessment
  getHealthAssessments(userId?: number): Promise<HealthAssessment[]>;
  getHealthAssessment(id: number): Promise<HealthAssessment | undefined>;
  createHealthAssessment(userId: number | null, data: InsertHealthAssessment): Promise<HealthAssessment>;
  
  // Session store for authentication
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  public sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      conObject: {
        connectionString: process.env.DATABASE_URL,
      },
      createTableIfMissing: true,
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, id));
      return user;
    } catch (error) {
      console.error("Error getting user:", error);
      return undefined;
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      const [user] = await db.select().from(users).where(eq(users.username, username));
      return user;
    } catch (error) {
      console.error("Error getting user by username:", error);
      return undefined;
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      const [user] = await db.insert(users).values(insertUser).returning();
      return user;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  // Period data methods
  async getPeriodDataForUser(userId: number): Promise<PeriodData[]> {
    try {
      return await db.select().from(periodData).where(eq(periodData.userId, userId));
    } catch (error) {
      console.error("Error getting period data:", error);
      return [];
    }
  }

  async createPeriodData(userId: number, data: InsertPeriodData): Promise<PeriodData> {
    try {
      // Create insert object with the correct fields
      const insertData = {
        userId,
        startDate: data.startDate,
        endDate: data.endDate || null,
        cycleLength: data.cycleLength || null,
        symptoms: data.symptoms || null,
      };
      
      const [periodEntry] = await db.insert(periodData).values(insertData).returning();
      return periodEntry;
    } catch (error) {
      console.error("Error creating period data:", error);
      throw error;
    }
  }

  async updatePeriodData(id: number, data: Partial<InsertPeriodData>): Promise<PeriodData | undefined> {
    try {
      const [updatedPeriod] = await db.update(periodData)
        .set(data)
        .where(eq(periodData.id, id))
        .returning();
      return updatedPeriod;
    } catch (error) {
      console.error("Error updating period data:", error);
      return undefined;
    }
  }

  async deletePeriodData(id: number): Promise<boolean> {
    try {
      const result = await db.delete(periodData).where(eq(periodData.id, id));
      return result != null;
    } catch (error) {
      console.error("Error deleting period data:", error);
      return false;
    }
  }

  // Health assessment methods
  async getHealthAssessments(userId?: number): Promise<HealthAssessment[]> {
    try {
      if (userId) {
        return await db.select().from(healthAssessment).where(eq(healthAssessment.userId, userId));
      }
      return await db.select().from(healthAssessment);
    } catch (error) {
      console.error("Error getting health assessments:", error);
      return [];
    }
  }

  async getHealthAssessment(id: number): Promise<HealthAssessment | undefined> {
    try {
      const [assessment] = await db.select().from(healthAssessment).where(eq(healthAssessment.id, id));
      return assessment;
    } catch (error) {
      console.error("Error getting health assessment:", error);
      return undefined;
    }
  }

  async createHealthAssessment(userId: number | null, data: InsertHealthAssessment): Promise<HealthAssessment> {
    try {
      // Create insert object with the correct fields
      const insertData = {
        age: data.age,
        condition: data.condition,
        responses: data.responses,
        riskScore: data.riskScore,
        recommendations: data.recommendations,
        userId: userId
      };
      
      const [assessment] = await db.insert(healthAssessment).values(insertData).returning();
      return assessment;
    } catch (error) {
      console.error("Error creating health assessment:", error);
      throw error;
    }
  }
}

export const storage = new DatabaseStorage();
