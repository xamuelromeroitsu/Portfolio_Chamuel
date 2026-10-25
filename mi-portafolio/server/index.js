import express from 'express';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import projects from '../src/data/projects.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.get('/api/projects', (_req, res) => {
  // La API entrega el mismo catálogo que se usa como respaldo local en el cliente.
  res.json(projects);
});

// El contacto se envía directamente con EmailJS desde el cliente; Express solo sirve proyectos y el build.
const distPath = path.join(__dirname, '..', 'dist');
if (existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

export default app;
