// Disposición compartida: navegación, contenido de la ruta y pie de página.
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import ScrollToHash from '../routing/ScrollToHash.jsx';

export default function SiteLayout() {
  return (
    <div className="site-shell">
      <Header />
      <ScrollToHash />
      <main id="contenido" tabIndex={-1}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
