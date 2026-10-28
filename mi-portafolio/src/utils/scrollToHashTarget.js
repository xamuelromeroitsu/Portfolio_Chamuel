export function scrollToHashTarget(targetId) {
  let frame;

  const scroll = () => {
    frame = window.requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  };

  scroll();

  return () => {
    if (frame !== undefined) window.cancelAnimationFrame(frame);
  };
}
