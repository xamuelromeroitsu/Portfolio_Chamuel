// useEffect registra y limpia el evento resize; useState guarda el tamaño y el punto de anclaje actuales.
import { useEffect, useState } from 'react';

export default function useLanyardLayout() {
  // Valores por defecto para pantallas grandes; los cortes se ajustan en updateLayout.
  const [layout, setLayout] = useState({ size: 0.56, anchor: 'right' });

  useEffect(() => {
    const updateLayout = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // En móviles angostos centramos y reducimos la tarjeta para que no tape el texto.
      if (width <= 520) {
        setLayout({
          size: height <= 650 ? 0.36 : 0.42,
          anchor: 'center',
        });
      } else if (width <= 760 || height <= 600) {
        // En pantallas medianas o bajas usamos un tamaño intermedio.
        setLayout({ size: 0.42, anchor: 'right' });
      } else {
        // Escritorio conserva el tamaño grande y el anclaje a la derecha.
        setLayout({ size: 0.56, anchor: 'right' });
      }
    };

    // Se calcula al montar y en cada cambio de tamaño; el cleanup evita listeners duplicados.
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  return layout;
}
