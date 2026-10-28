export function scrollToHashTarget(targetId) {
  let frame;
  let observer;

  const scroll = () => {
    frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  };

  const projects = targetId === 'contacto' ? document.getElementById('proyectos') : null;
  if (projects?.getAttribute('aria-busy') === 'true') {
    observer = new MutationObserver(() => {
      if (projects.getAttribute('aria-busy') !== 'true') {
        observer.disconnect();
        scroll();
      }
    });
    observer.observe(projects, { attributes: true, attributeFilter: ['aria-busy'] });
  } else {
    scroll();
  }

  return () => {
    if (frame !== undefined) window.cancelAnimationFrame(frame);
    observer?.disconnect();
  };
}
