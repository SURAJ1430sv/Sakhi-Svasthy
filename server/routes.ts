import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { insertPeriodDataSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);

  // Period tracking endpoints
  app.get("/api/period-data", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const userId = req.user.id;
      const periodData = await storage.getPeriodDataForUser(userId);
      res.json(periodData);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch period data" });
    }
  });

  app.post("/api/period-data", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const userId = req.user.id;
      const validatedData = insertPeriodDataSchema.parse(req.body);
      
      const periodData = await storage.createPeriodData(userId, validatedData);
      res.status(201).json(periodData);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Failed to create period data" });
      }
    }
  });

  app.put("/api/period-data/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertPeriodDataSchema.partial().parse(req.body);
      
      const updatedPeriod = await storage.updatePeriodData(id, validatedData);
      if (!updatedPeriod) {
        return res.status(404).json({ message: "Period data not found" });
      }
      
      res.json(updatedPeriod);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        res.status(500).json({ message: "Failed to update period data" });
      }
    }
  });

  app.delete("/api/period-data/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deletePeriodData(id);
      
      if (!success) {
        return res.status(404).json({ message: "Period data not found" });
      }
      
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "Failed to delete period data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
