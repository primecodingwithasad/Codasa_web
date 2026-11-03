import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini SDK if API key is present
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({ apiKey });
}

// REST Endpoints
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    appName: 'Codasa Visual Discovery Platform',
    version: '1.0.0',
    geminiEnabled: Boolean(apiKey)
  });
});

// AI Copy Generator (Generate Pin Title, Description, and Tags)
app.post('/api/ai/magic-pin', async (req, res) => {
  try {
    const { topic, context } = req.body;
    if (!topic && !context) {
      return res.status(400).json({ error: 'Topic or context is required' });
    }

    if (aiClient) {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `You are an expert editorial copywriter for Codasa (a visual discovery platform like Pinterest).
Create an aesthetic, engaging Pin metadata for this image or topic:
Topic: "${topic || context}"
Return ONLY valid JSON with keys:
{
  "title": "Creative, clickable, evocative title (max 50 chars)",
  "description": "Engaging, sensory, descriptive caption with details on materials, mood, styling or recipe (1-2 sentences)",
  "category": "One of: Architecture, Home Decor, Design, Fashion, Photography, Food, Technology, Travel, Art, DIY",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}`
      });

      const text = response.text || '';
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleanJson);
      return res.json({ success: true, data: parsed });
    } else {
      // High-quality deterministic fallback
      const sampleTags = ['Design', 'Minimalism', 'Inspiration', 'Aesthetic', 'Modern'];
      return res.json({
        success: true,
        data: {
          title: topic ? `Curated ${topic.charAt(0).toUpperCase() + topic.slice(1)} Inspiration` : 'Minimalist Visual Study',
          description: `A thoughtfully curated visual moment highlighting tactile materials, balanced lighting, and calm aesthetics.`,
          category: 'Design',
          tags: sampleTags
        }
      });
    }
  } catch (err: any) {
    console.error('AI Magic Pin error:', err);
    return res.status(500).json({
      error: 'Failed to generate copy',
      details: err?.message || String(err)
    });
  }
});

// AI Visual Similarity & Object Analysis
app.post('/api/ai/visual-search', async (req, res) => {
  try {
    const { imageUrl, tags } = req.body;
    if (aiClient && imageUrl) {
      const response = await aiClient.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `Analyze this image URL or concept for visual discovery search: ${imageUrl}. Identify 4 key aesthetic concepts, dominant colors, and styling themes for visual similarity matching. Return JSON: { "dominantStyles": ["...", "..."], "keywords": ["...", "..."] }`
      });
      const text = response.text || '';
      const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
      try {
        const parsed = JSON.parse(cleanJson);
        return res.json({ success: true, analysis: parsed });
      } catch (e) {
        // fallback
      }
    }

    return res.json({
      success: true,
      analysis: {
        dominantStyles: ['Warm Minimalist', 'Textured Luxury', 'Modern Geometric'],
        keywords: tags || ['Aesthetic', 'Inspiration', 'Interior']
      }
    });
  } catch (err: any) {
    console.error('Visual search error:', err);
    return res.status(500).json({ error: 'Failed visual search' });
  }
});

// Setup Vite middleware in dev or static files in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Codasa Server] Running on http://localhost:${PORT}`);
  });
}

startServer();
