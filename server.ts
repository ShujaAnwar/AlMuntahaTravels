import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";
import cors from "cors";
import compression from "compression";
import { createClient } from "@supabase/supabase-js";
import multer from "multer";

// Supabase client (Lazy Initialization)
let supabaseClient: any = null;
function getSupabase() {
  if (!supabaseClient) {
    const url = process.env.VITE_SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
    if (url && key) {
      supabaseClient = createClient(url, key);
    }
  }
  return supabaseClient;
}

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

  app.use(compression());
  app.use(cors());
  app.use(express.json());

  // Configure Multer for image uploads
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = path.join(process.cwd(), "uploads");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    },
  });
  const upload = multer({ storage });

  // Upload Endpoint
  app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    // Return the relative URL
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
  });

  // Serve uploads directory
  app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

  // API Routes
  app.get("/api/leads", async (req, res) => {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase.from("leads").select("*").order("createdAt", { ascending: false });
      if (!error) return res.json(data);
      console.error("Supabase error (fetch):", error);
    }
    // Fallback or if no supabase
    const leads = readLeads();
    res.json(leads);
  });

  app.post("/api/leads", async (req, res) => {
    const newLead = {
      id: Math.random().toString(36).substring(2, 11),
      ...req.body,
      status: "New",
      createdAt: new Date().toISOString(),
      assignedTo: null,
      assignedAt: null
    };

    const supabase = getSupabase();
    if (supabase) {
      const { error } = await supabase.from("leads").insert([newLead]);
      if (!error) return res.json(newLead);
      console.error("Supabase error (insert):", error);
    }

    // Fallback
    const leads = readLeads();
    leads.push(newLead);
    saveLeads(leads);
    res.json(newLead);
  });

  app.patch("/api/leads/:id", async (req, res) => {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase.from("leads").update(req.body).eq("id", req.params.id).select().single();
      if (!error) return res.json(data);
      console.error("Supabase error (update):", error);
    }

    // Fallback
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

  // Lead locking check
  app.post("/api/leads/:id/accept", async (req, res) => {
    const { agentId } = req.body;
    const supabase = getSupabase();

    if (supabase) {
      const { data: lead, error: fetchError } = await supabase.from("leads").select("*").eq("id", req.params.id).single();
      if (lead) {
        const now = new Date().getTime();
        const assignedAt = lead.assignedAt ? new Date(lead.assignedAt).getTime() : 0;
        const hoursPassed = (now - assignedAt) / (1000 * 60 * 60);

        if (!lead.assignedTo || lead.assignedTo === agentId || (lead.status !== "Confirmed" && hoursPassed >= 24)) {
          const { data: updatedLead, error: updateError } = await supabase.from("leads")
            .update({
              assignedTo: agentId,
              assignedAt: new Date().toISOString(),
              status: lead.status === "New" ? "Assigned" : lead.status
            })
            .eq("id", req.params.id)
            .select()
            .single();
          
          if (!updateError) return res.json(updatedLead);
        } else {
          return res.status(409).json({ error: "Lead is already assigned and active" });
        }
      }
    }

    // Fallback
    const leads = readLeads();
    const index = leads.findIndex((l: any) => l.id === req.params.id);
    
    if (index !== -1) {
      const lead = leads[index];
      const now = new Date().getTime();
      const assignedAt = lead.assignedAt ? new Date(lead.assignedAt).getTime() : 0;
      const hoursPassed = (now - assignedAt) / (1000 * 60 * 60);

      if (!lead.assignedTo || lead.assignedTo === agentId || (lead.status !== "Confirmed" && hoursPassed >= 24)) {
        lead.assignedTo = agentId;
        lead.assignedAt = new Date().toISOString();
        if (lead.status === "New") {
          lead.status = "Assigned";
        }
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
