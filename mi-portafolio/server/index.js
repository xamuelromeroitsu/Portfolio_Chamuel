import cors from 'cors';
import express from 'express';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import projects from '../src/data/projects.js';
import { contactSchema } from '../src/data/contactSchema.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

// Habilita solicitudes web y parsea los cuerpos JSON enviados por el formulario.
app.use(cors());
app.use(express.json());

app.get('/api/projects', (_req, res) => {
  // La API entrega el mismo catálogo que se usa como respaldo local en el cliente.
  res.json(projects);
});

const dataDir = path.join(__dirname, 'data');
const messagesFile = path.join(dataDir, 'messages.json');

app.post('/api/contact', (req, res) => {
  // Valida los campos antes de guardar; el mismo esquema se usa en React.
  const parsed = contactSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      ok: false,
      errors: parsed.error.flatten().fieldErrors
    });
  }

  const message = { ...parsed.data, createdAt: new Date().toISOString() };

  try {
    // Los mensajes se guardan en server/data/messages.json; mkdir crea la carpeta si aún no existe.
    mkdirSync(dataDir, { recursive: true });
    const messages = existsSync(messagesFile) ? JSON.parse(readFileSync(messagesFile, 'utf8')) : [];
    messages.push(message);
    writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
    res.status(201).json({ ok: true });
  } catch (error) {
    console.error('No se pudo guardar el mensaje:', error);
    res.status(500).json({ ok: false, message: 'Error al guardar el mensaje.' });
  }
});

// En producción sirve el build de Vite (dist/)
const distPath = path.join(__dirname, '..', 'dist');
if (existsSync(distPath)) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.method !== 'GET' || req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

export default app;
