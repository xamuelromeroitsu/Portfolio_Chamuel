// Página Sobre mí: biografía, enfoque, experiencia, educación y stack.
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function AboutPage() {
  const { t, i18n } = useTranslation();
  const lang = i18n.resolvedLanguage || 'es';

  return (
    <section className="about-page">
      <h1>Sobre mí</h1>
      <p>
        Desarrollador de software junior e ingeniero de soluciones con base en
        electrónica y sistemas físicos. Ayudo a profesionales y pequeñas
        empresas de servicios a convertir procesos manuales de atención, citas
        y cotizaciones en sistemas digitales claros, automatizados y medibles.
        Mi enfoque combina el rigor de la ingeniería física con el desarrollo
        de software estructurado y útil para hacer crecer un negocio.
      </p>

      <h2>Enfoque de trabajo</h2>
      <dl className="golden-circle">
        <dt>Por qué lo hago</dt>
        <dd>
          Para demostrar que el software puede ser claro, estructurado y útil
          para hacer crecer un negocio.
        </dd>
        <dt>Cómo lo hago</dt>
        <dd>
          Analizando el proceso, diseñando el sistema y aplicando rigor de
          ingeniería antes de escribir código.
        </dd>
        <dt>Qué soluciono</dt>
        <dd>
          Procesos manuales, herramientas desconectadas y operaciones difíciles
          de controlar.
        </dd>
        <dt>Qué construyo</dt>
        <dd>
          Webapps, automatizaciones, paneles, APIs y asistentes digitales
          adaptados al negocio.
        </dd>
        <dt>Qué resultado genero</dt>
        <dd>
          Ayudar a recuperar tiempo, reducir errores y operar con mayor
          profesionalismo.
        </dd>
      </dl>

      <h2>Experiencia</h2>
      <ul className="about-list">
        <li>
          <h3>Asistente de Ingeniería</h3>
          <p>Sistemas y Automatización</p>
          <p>
            Enfoque en análisis de procesos, reportes técnicos, optimización
            operativa y configuración de sistemas de control e infraestructura.
          </p>
        </li>
        <li>
          <h3>Desarrollo de Soluciones de Software</h3>
          <p>Webapps y automatizaciones</p>
          <p>
            Creación de aplicaciones web, paneles de gestión y automatizaciones
            orientadas a resolver problemas reales de negocio (como gestión de
            citas, flotas y atención digital).
          </p>
        </li>
      </ul>

      <h2>Educación y formación</h2>
      <ul className="about-list">
        <li>
          <h3>Técnico Medio en Electrónica</h3>
          <p>Escuela Técnica Popular Don Bosco</p>
        </li>
        <li>
          <h3>Estudiante de TSU en Comunicaciones y Electrónica</h3>
          <p>UNEFA</p>
        </li>
        <li>
          <h3>Desarrollo de Aplicaciones Móviles y Web con IA</h3>
          <p>Instituto Tecnológico Sitio Uno</p>
        </li>
      </ul>

      <h2>Stack tecnológico</h2>
      <div className="stack-chips">
        <span>JavaScript</span>
        <span>Python</span>
        <span>Dart</span>
        <span>Flutter</span>
        <span>React.js</span>
        <span>Node.js</span>
        <span>Express.js</span>
        <span>PostgreSQL</span>
        <span>Supabase</span>
        <span>Firebase</span>
        <span>Git</span>
        <span>GitHub</span>
        <span>Docker</span>
        <span>Podman</span>
        <span>Vercel y entornos Linux</span>
      </div>

      <h2>¿Hablamos?</h2>
      <p>¿Tienes un proceso manual de atención, citas o cotizaciones?</p>
      <Link to={`/${lang}/contact/`} className="button">
        {t('contact.eyebrow')}
      </Link>
    </section>
  );
}
