// Este componente reúne los elementos del hero que comparten contexto visual y ajustes responsive.
import Header from '../layout/Header.jsx';
import Hero from './Hero.jsx';
import Lanyard from './Lanyard.jsx';
import useLanyardLayout from './useLanyardLayout.js';
// Las imágenes se importan desde assets para que Vite las incluya y resuelva en el build.
import cardFront from '../../assets/images/lanyard/card-front.jpg';
import cardBack from '../../assets/images/lanyard/card-back.jpg';
import band from '../../assets/images/lanyard/band.png';

export default function HeroExperience() {
  // El hook adapta el tamaño y el anclaje de la tarjeta según el tamaño de pantalla.
  const lanyardLayout = useLanyardLayout();

  // El contenedor sirve de referencia para superponer el canvas sin alterar el flujo del header y el hero.
  return (
    <div className="lanyard-area">
      <div className="lanyard-overlay">
        {/* Las imágenes y las props conservan el diseño y el movimiento existentes del lanyard. */}
        <Lanyard
          frontImage={cardFront}
          backImage={cardBack}
          strapImage={band}
          cardColor="#06b6d4"
          finish="metallic"
          anchor={lanyardLayout.anchor}
          strapColor="#000000"
          size={lanyardLayout.size}
          damping={0.35}
          elasticity={0.65}
          breeze={0.55}
          intro
          interactive
        />
      </div>
      <Header />
      {/* Mantiene el hero en el mismo ancho y alineación que las otras secciones principales. */}
      <div className="site-main site-main--hero">
        <Hero />
      </div>
    </div>
  );
}
