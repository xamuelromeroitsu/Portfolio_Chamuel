import projects from '../src/data/projects.js';

// Función de Vercel: /api/projects en producción. En desarrollo, Vite reenvía
// /api al servidor Express (server/index.js), que expone los mismos campos.
export default function handler(_request, response) {
  response.setHeader(
    'Cache-Control',
    'public, s-maxage=3600, stale-while-revalidate=86400'
  );
  response.status(200).json(
    projects.map(({ id, link, external, stack }) => ({
      id,
      link,
      external,
      stack
    }))
  );
}
