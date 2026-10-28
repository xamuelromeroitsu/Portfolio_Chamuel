// Desplaza a la sección del hash (`/en/#contacto`). Los IDs de sección
// (`inicio`, `proyectos`, `contacto`, `contenido`) son constantes y no se traducen.
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { scrollToHashTarget } from '../../utils/scrollToHashTarget.js';

export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return undefined;

    const targetId = decodeURIComponent(hash.slice(1));
    return scrollToHashTarget(targetId);
  }, [pathname, hash]);

  return null;
}
