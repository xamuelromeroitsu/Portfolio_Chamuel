import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToHashTarget } from '../utils/scrollToHashTarget.js';

export function useContactLink(lang) {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const cleanupScroll = useRef(null);
  const href = `/${lang}/#contacto`;
  const isHome = pathname.replace(/\/+$/, '') === `/${lang}`;

  useEffect(() => () => cleanupScroll.current?.(), []);

  const handleClick = (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    cleanupScroll.current?.();

    if (isHome && hash === '#contacto') {
      cleanupScroll.current = scrollToHashTarget('contacto');
      return;
    }

    navigate(href, { replace: true });
  };

  return { href, handleClick };
}
