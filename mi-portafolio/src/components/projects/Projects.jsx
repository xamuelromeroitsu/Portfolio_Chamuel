import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  useVelocity
} from 'motion/react';
import { Link } from 'react-router-dom';
import localProjects from '../../data/projects';

const previewWidth = 272;
const previewHeight = 182;
const springConfig = { stiffness: 160, damping: 22 };

export default function Projects() {
  const { t, i18n } = useTranslation();
  const sectionRef = useRef(null);
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [unavailableImage, setUnavailableImage] = useState(null);
  const reduceMotion = useReducedMotion();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorVelocityX = useVelocity(cursorX);
  const tilt = useSpring(
    useTransform(cursorVelocityX, [-1200, 1200], [-8, 8]),
    springConfig
  );
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const localizedProjects = useMemo(
    () => localProjects.map((project) => ({
      ...project,
      ...t(`projects.items.${project.id}`, {
        returnObjects: true,
        defaultValue: {}
      })
    })),
    [t, i18n.resolvedLanguage]
  );
  const visibleProjects = localizedProjects.filter((project) => project.featured);

  const activeProject =
    visibleProjects.find((project) => project.id === activeProjectId) ??
    (activeProjectId === 'more-projects'
      ? {
          id: 'more-projects',
          title: t('projects.viewMore'),
          image: '/images/projects/more-projects.jpg'
        }
      : null);
  const lang = i18n.resolvedLanguage || 'es';

  const updatePreviewPosition = (clientX, clientY) => {
    const bounds = sectionRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const pointerX = clientX - bounds.left;
    const pointerY = clientY - bounds.top;
    const left =
      pointerX + previewWidth + 24 > bounds.width
        ? pointerX - previewWidth - 24
        : pointerX + 24;

    cursorX.set(Math.max(8, Math.min(left, bounds.width - previewWidth - 8)));
    cursorY.set(
      Math.max(
        8,
        Math.min(pointerY - previewHeight / 2, bounds.height - previewHeight - 8)
      )
    );
  };

  return (
    <section
      className="projects"
      id="proyectos"
      ref={sectionRef}
      onMouseMove={(event) =>
        updatePreviewPosition(event.clientX, event.clientY)
      }
    >
      <div className="projects-heading">
        <h2>{t('projects.title')}</h2>
        <p>{t('projects.hint')}</p>
      </div>

      <div className="projects-links">
        {visibleProjects.map((project, index) => (
          <a
            className="projects-link"
            href={project.link}
            key={project.id}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title}: ${t('projects.viewLive')}`}
            onMouseEnter={() => setActiveProjectId(project.id)}
            onMouseLeave={() => setActiveProjectId(null)}
            onFocus={(event) => {
              if (!sectionRef.current) return;
              setActiveProjectId(project.id);
              updatePreviewPosition(
                event.currentTarget.getBoundingClientRect().left +
                  previewWidth / 2,
                event.currentTarget.getBoundingClientRect().top +
                  previewHeight / 2
              );
            }}
            onBlur={() => setActiveProjectId(null)}
          >
            <span className="projects-link__number" aria-hidden="true">
              0{index + 1}
            </span>
            <span className="projects-link__copy">
              <span className="projects-link__title">{project.title}</span>
              <span className="projects-link__description">
                {project.description}
              </span>
            </span>
            <span className="projects-link__action" aria-hidden="true">
              {t('projects.viewLive')} <span>↗</span>
            </span>
          </a>
        ))}
      </div>

      <Link
        className="projects-more"
        to={`/${lang}/projects/`}
        onMouseEnter={() => setActiveProjectId('more-projects')}
        onMouseLeave={() => setActiveProjectId(null)}
        onFocus={(event) => {
          setActiveProjectId('more-projects');
          updatePreviewPosition(
            event.currentTarget.getBoundingClientRect().left + previewWidth / 2,
            event.currentTarget.getBoundingClientRect().top + previewHeight / 2
          );
        }}
        onBlur={() => setActiveProjectId(null)}
        aria-label={t('projects.viewMore')}
      >
        <span className="projects-more__icon" aria-hidden="true">∞</span>
        <span>{t('projects.viewMore')}</span>
        <span className="projects-more__arrow" aria-hidden="true">↗</span>
      </Link>

      <AnimatePresence>
        {activeProject && (
          <motion.div
            className="projects-preview"
            aria-hidden="true"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: reduceMotion ? 1 : 0.88 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
            style={{
              x: reduceMotion ? cursorX : cursorXSpring,
              y: reduceMotion ? cursorY : cursorYSpring,
              rotate: reduceMotion ? 0 : tilt
            }}
          >
            {unavailableImage !== activeProject.image && (
              <img
                key={activeProject.image}
                src={activeProject.image}
                alt=""
                onError={() => setUnavailableImage(activeProject.image)}
              />
            )}
            {unavailableImage === activeProject.image && (
              <span className="projects-preview__placeholder">
                <strong>{activeProject.title}</strong>
                <span>{t('projects.addPreviewImage')}</span>
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
