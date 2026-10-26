import express from 'express';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import projects from '../src/data/projects.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.get('/', (_req, res) => {
  res.redirect(301, '/es/');
});

app.get('/api/projects', (_req, res) => {
  // La API entrega datos neutrales; el cliente añade el contenido traducido.
  res.json(
    projects.map(({ id, link, external, stack }) => ({
      id,
      link,
      external,
      stack
    }))
  );
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

const isDirectRun =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  const port = Number(process.env.PORT) || 3001;
  app.listen(port, () => {
    console.log(`API de proyectos en http://localhost:${port}`);
  });
}

export default app;
