// profile contiene los datos neutrales del hero; los textos viven en los locales.
import { useTranslation } from 'react-i18next';
import profile from '../../data/profile';

export default function Hero() {
  const { t } = useTranslation();
  const { name, skills, stats } = profile;

  return (
    <section className="hero" id="inicio">
      {/* El id inicio es el destino de los enlaces del menú y del pie de página. */}
      <div className="hero-content">
        <span className="hero-label">{t('hero.label')}</span>
        <h1>
          {name}
          <br />
          {t('hero.role')}
        </h1>
        <p className="hero-description">{t('hero.description')}</p>
        <div className="hero-skills">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </div>
      <div className="hero-visual">
        <div className="hero-card">
          {stats.map((stat) => (
            <p key={stat.id}>
              <strong>{stat.value}</strong> {t(`hero.stats.${stat.id}`)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
