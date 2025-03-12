import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { 
  insertPeriodDataSchema, 
  insertHealthAssessmentSchema, 
  healthAssessmentSchema 
} from "@shared/schema";
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

  // Health Assessment endpoints
  app.get("/api/health-assessments", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const userId = req.user.id;
      const assessments = await storage.getHealthAssessments(userId);
      res.json(assessments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch health assessments" });
    }
  });

  app.get("/api/health-assessments/:id", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const id = parseInt(req.params.id);
      const assessment = await storage.getHealthAssessment(id);
      
      if (!assessment) {
        return res.status(404).json({ message: "Health assessment not found" });
      }
      
      res.json(assessment);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch health assessment" });
    }
  });

  app.post("/api/health-assessments", async (req, res) => {
    try {
      // Allow anonymous assessments
      const userId = req.isAuthenticated() ? req.user.id : null;
      
      // First validate input data using healthAssessmentSchema
      const inputData = healthAssessmentSchema.parse(req.body);
      
      // Calculate risk score and recommendations based on the responses
      const riskScore = calculateRiskScore(inputData);
      const recommendations = generateRecommendations(inputData, riskScore);
      
      // Create final data for storage with insertHealthAssessmentSchema
      const assessmentData = insertHealthAssessmentSchema.parse({
        age: inputData.age,
        condition: inputData.condition,
        responses: JSON.stringify(inputData.responses),
        riskScore,
        recommendations
      });
      
      const assessment = await storage.createHealthAssessment(userId, assessmentData);
      res.status(201).json(assessment);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ message: validationError.message });
      } else {
        console.error('Health assessment creation error:', error);
        res.status(500).json({ message: "Failed to create health assessment" });
      }
    }
  });

  // Helper functions for health assessment
  function calculateRiskScore(data) {
    const { responses, condition, age } = data;
    let score = 0;
    
    // Base score based on age
    if (age > 40) score += 20;
    else if (age > 30) score += 10;
    
    // Calculate score based on responses and condition
    if (condition === 'pcos' || condition === 'pcod') {
      // PCOS/PCOD specific scoring
      if (responses['irregular_periods'] === true) score += 15;
      if (responses['weight_gain'] === true) score += 10;
      if (responses['hair_growth'] === true) score += 10;
      if (responses['acne'] === true) score += 5;
      if (responses['family_history'] === true) score += 15;
    } else if (condition === 'breast_cancer') {
      // Breast cancer specific scoring
      if (responses['family_history'] === true) score += 20;
      if (responses['lumps'] === true) score += 25;
      if (responses['nipple_changes'] === true) score += 15;
      if (responses['breast_pain'] === true) score += 10;
      if (age > 50) score += 10; // Additional age factor for breast cancer
    }
    
    // Cap the score at 100
    return Math.min(score, 100);
  }

  function generateRecommendations(data, riskScore) {
    const { condition, age } = data;
    let recommendations = [];
    
    // General recommendations
    recommendations.push('Maintain a healthy diet and regular exercise routine.');
    
    if (condition === 'pcos' || condition === 'pcod') {
      // PCOS/PCOD recommendations
      if (riskScore > 70) {
        recommendations.push('High risk: Schedule an appointment with a gynecologist immediately.');
        recommendations.push('Consider hormonal tests and ultrasound examination.');
      } else if (riskScore > 40) {
        recommendations.push('Moderate risk: Consult with a gynecologist within the next month.');
        recommendations.push('Monitor your symptoms and keep a symptom diary.');
      } else {
        recommendations.push('Low risk: Continue with regular health check-ups.');
        recommendations.push('Consider making lifestyle changes to reduce symptoms.');
      }
      
      recommendations.push('Learn more about PCOS/PCOD in our education section.');
    } else if (condition === 'breast_cancer') {
      // Breast cancer recommendations
      if (riskScore > 70) {
        recommendations.push('High risk: Schedule a mammogram and consult with an oncologist immediately.');
        recommendations.push('Consider genetic counseling and testing, especially if you have family history.');
      } else if (riskScore > 40) {
        recommendations.push('Moderate risk: Schedule a clinical breast exam within the next month.');
        recommendations.push('Learn how to perform regular breast self-examinations.');
      } else {
        recommendations.push('Low risk: Continue with regular screening as appropriate for your age.');
        if (age > 40) {
          recommendations.push('Women over 40 should have a mammogram every 1-2 years.');
        }
      }
      
      recommendations.push('Learn more about breast cancer in our education section.');
    }
    
    // Return as a JSON string
    return recommendations.join('\\n');
  }

  const httpServer = createServer(app);

  return httpServer;
}
