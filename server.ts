import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import cors from "cors";

// Simple persistent storage
const DATA_FILE = path.join(process.cwd(), "leads.json");

function readLeads() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    }
  } catch (e) {
    console.error("Error reading leads", e);
  }
  return [];
}

function saveLeads(leads: any[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2));
  } catch (e) {
    console.error("Error saving leads", e);
  }
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/leads", (req, res) => {
    const leads = readLeads();
    res.json(leads);
  });

  app.post("/api/leads", (req, res) => {
    const leads = readLeads();
    const newLead = {
      id: Math.random().toString(36).substring(2, 11),
      ...req.body,
      status: "New",
      createdAt: new Date().toISOString(),
      assignedTo: null,
      assignedAt: null
    };
    leads.push(newLead);
    saveLeads(leads);
    res.json(newLead);
  });

  app.patch("/api/leads/:id", (req, res) => {
    const leads = readLeads();
    const index = leads.findIndex((l: any) => l.id === req.params.id);
    if (index !== -1) {
      leads[index] = { ...leads[index], ...req.body };
      saveLeads(leads);
      res.json(leads[index]);
    } else {
      res.status(404).json({ error: "Lead not found" });
    }
  });

  // Lead locking check (Cron-like behavior can be added but for now we do it on fetch)
  app.post("/api/leads/:id/accept", (req, res) => {
    const leads = readLeads();
    const { agentId } = req.body;
    const index = leads.findIndex((l: any) => l.id === req.params.id);
    
    if (index !== -1) {
      const lead = leads[index];
      const now = new Date().getTime();
      const assignedAt = lead.assignedAt ? new Date(lead.assignedAt).getTime() : 0;
      const hoursPassed = (now - assignedAt) / (1000 * 60 * 60);

      if (!lead.assignedTo || (lead.status !== "Confirmed" && hoursPassed >= 24)) {
        lead.assignedTo = agentId;
        lead.assignedAt = new Date().toISOString();
        lead.status = "Assigned";
        saveLeads(leads);
        res.json(lead);
      } else {
        res.status(409).json({ error: "Lead is already assigned and active" });
      }
    } else {
      res.status(404).json({ error: "Lead not found" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
