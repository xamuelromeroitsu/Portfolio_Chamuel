// Menú de navegación escalonado inspirado en el componente StaggeredMenu de React Bits.
// Se adaptó a los tokens del portafolio: sin logo, icono hamburguesa -> X, control de tema
// dentro del panel y accesibilidad (Escape, foco, inert y bloqueo de scroll).
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './StaggeredMenu.css';

const prefersReducedMotion = () =>
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

export const StaggeredMenu = ({
  position = 'right',
  items = [],
  barItems = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  menuLabel = 'Menú',
  closeLabel = 'Cerrar',
  isFixed = false,
  desktopInline = false,
  closeOnClickAway = true,
  themeControl = null,
  onMenuOpen,
  onMenuClose
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef(null);
  const preLayersRef = useRef(null);
  const preLayerElsRef = useRef([]);
  const textInnerRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const headerRef = useRef(null);
  const [textLines, setTextLines] = useState([menuLabel]);

  const openTlRef = useRef(null);
  const closeTweenRef = useRef(null);
  const textCycleAnimRef = useRef(null);
  const scrollLockRef = useRef(null);

  // Posiciona el panel y las capas fuera de pantalla al montar. Solo depende de
  // position para que un cambio de tema con el panel abierto no lo reinicie.
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const textInner = textInnerRef.current;
      if (!panel) return;

      const layers = preContainer
        ? Array.from(preContainer.querySelectorAll('.sm-prelayer'))
        : [];
      preLayerElsRef.current = layers;

      const offscreen = position === 'left' ? -100 : 100;
      gsap.set([panel, ...layers], { xPercent: offscreen, opacity: 1 });
      if (preContainer) gsap.set(preContainer, { xPercent: 0, opacity: 1 });
      if (textInner) gsap.set(textInner, { yPercent: 0 });
    });

    return () => ctx.revert();
  }, [position]);

  // El bloqueo se aplica y se libera de forma síncrona para que los enlaces con
  // ancla (#contacto) puedan desplazar la página justo después de cerrar el menú.
  const lockScroll = useCallback(() => {
    if (scrollLockRef.current) return;
    const body = document.body;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    scrollLockRef.current = {
      overflow: body.style.overflow,
      paddingRight: body.style.paddingRight
    };
    body.style.overflow = 'hidden';
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`;
  }, []);

  const unlockScroll = useCallback(() => {
    if (!scrollLockRef.current) return;
    const body = document.body;
    body.style.overflow = scrollLockRef.current.overflow;
    body.style.paddingRight = scrollLockRef.current.paddingRight;
    scrollLockRef.current = null;
  }, []);

  useEffect(() => () => unlockScroll(), [unlockScroll]);

  const focusToggle = () => {
    toggleBtnRef.current?.focus({ preventScroll: true });
  };

  const focusFirstItem = () => {
    panelRef.current?.querySelector('.sm-panel-item')?.focus({ preventScroll: true });
  };

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();
    closeTweenRef.current = null;

    const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel'));
    const numberEls = Array.from(
      panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
    );
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = Array.from(panel.querySelectorAll('.sm-socials-link'));
    const themeEl = panel.querySelector('.sm-theme');

    const offscreen = position === 'left' ? -100 : 100;

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (numberEls.length) gsap.set(numberEls, { '--sm-num-opacity': 0 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });
    if (themeEl) gsap.set(themeEl, { opacity: 0, y: 10 });

    const tl = gsap.timeline({ paused: true });

    layers.forEach((layer, index) => {
      tl.fromTo(
        layer,
        { xPercent: offscreen },
        { xPercent: 0, duration: 0.5, ease: 'power4.out' },
        index * 0.07
      );
    });

    const lastTime = layers.length ? (layers.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layers.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: offscreen },
      { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
      panelInsertTime
    );

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: 'power4.out',
          stagger: { each: 0.1, from: 'start' }
        },
        itemsStart
      );

      if (numberEls.length) {
        tl.to(
          numberEls,
          {
            duration: 0.6,
            ease: 'power2.out',
            '--sm-num-opacity': 1,
            stagger: { each: 0.08, from: 'start' }
          },
          itemsStart + 0.1
        );
      }
    }

    const extrasStart = panelInsertTime + panelDuration * 0.4;

    if (themeEl) {
      tl.to(themeEl, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, extrasStart);
    }

    if (socialTitle) {
      tl.to(socialTitle, { opacity: 1, duration: 0.5, ease: 'power2.out' }, extrasStart);
    }

    if (socialLinks.length) {
      tl.to(
        socialLinks,
        {
          y: 0,
          opacity: 1,
          duration: 0.55,
          ease: 'power3.out',
          stagger: { each: 0.08, from: 'start' }
        },
        extrasStart + 0.04
      );
    }

    openTlRef.current = tl;
    return tl;
  }, [position]);

  // Estado final sin animación para usuarios con movimiento reducido.
  const applyOpenState = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const layers = preLayerElsRef.current;
    const itemEls = panel.querySelectorAll('.sm-panel-itemLabel');
    const numberEls = panel.querySelectorAll(
      '.sm-panel-list[data-numbering] .sm-panel-item'
    );
    const socialTitle = panel.querySelector('.sm-socials-title');
    const socialLinks = panel.querySelectorAll('.sm-socials-link');
    const themeEl = panel.querySelector('.sm-theme');

    gsap.set([panel, ...layers], { xPercent: 0, opacity: 1 });
    gsap.set(itemEls, { yPercent: 0, rotate: 0 });
    gsap.set(numberEls, { '--sm-num-opacity': 1 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 1 });
    gsap.set(socialLinks, { y: 0, opacity: 1 });
    if (themeEl) gsap.set(themeEl, { opacity: 1, y: 0 });
  }, []);

  const playOpen = useCallback(() => {
    if (prefersReducedMotion()) {
      openTlRef.current?.kill();
      applyOpenState();
      return;
    }

    const tl = buildOpenTimeline();
    tl?.play(0);
  }, [applyOpenState, buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const offscreen = position === 'left' ? -100 : 100;
    closeTweenRef.current?.kill();

    if (prefersReducedMotion()) {
      gsap.set([...layers, panel], { xPercent: offscreen, opacity: 1 });
      return;
    }

    closeTweenRef.current = gsap.to([...layers, panel], {
      xPercent: offscreen,
      duration: 0.32,
      ease: 'power3.in',
      overwrite: 'auto'
    });
  }, [position]);

  const animateText = useCallback(
    (opening) => {
      const inner = textInnerRef.current;
      if (!inner) return;
      textCycleAnimRef.current?.kill();

      const currentLabel = opening ? menuLabel : closeLabel;
      const targetLabel = opening ? closeLabel : menuLabel;

      if (prefersReducedMotion()) {
        setTextLines([targetLabel]);
        gsap.set(inner, { yPercent: 0 });
        return;
      }

      const cycles = 3;
      const seq = [currentLabel];
      let last = currentLabel;
      for (let index = 0; index < cycles; index += 1) {
        last = last === menuLabel ? closeLabel : menuLabel;
        seq.push(last);
      }
      if (last !== targetLabel) seq.push(targetLabel);
      seq.push(targetLabel);
      setTextLines(seq);

      gsap.set(inner, { yPercent: 0 });
      const lineCount = seq.length;
      const finalShift = ((lineCount - 1) / lineCount) * 100;
      textCycleAnimRef.current = gsap.to(inner, {
        yPercent: -finalShift,
        duration: 0.5 + lineCount * 0.07,
        ease: 'power4.out'
      });
    },
    [closeLabel, menuLabel]
  );

  const closeMenu = useCallback(
    (returnFocus = true) => {
      if (!openRef.current) return;
      openRef.current = false;
      setOpen(false);
      unlockScroll();
      onMenuClose?.();
      playClose();
      animateText(false);
      if (returnFocus) window.setTimeout(focusToggle, 0);
    },
    [animateText, onMenuClose, playClose, unlockScroll]
  );

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      lockScroll();
      onMenuOpen?.();
      playOpen();
      window.setTimeout(focusFirstItem, 60);
    } else {
      unlockScroll();
      onMenuClose?.();
      playClose();
    }

    animateText(target);
  }, [animateText, lockScroll, onMenuClose, onMenuOpen, playClose, playOpen, unlockScroll]);

  // Escape cierra y devuelve el foco al botón.
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeMenu(true);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeMenu, open]);

  // Clic fuera del panel (solo tiene efecto en desktop, donde el panel no cubre todo).
  useEffect(() => {
    if (!closeOnClickAway || !open) return undefined;

    const handleClickOutside = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        closeMenu(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [closeMenu, closeOnClickAway, open]);

  // Si el viewport pasa al layout de desktop con el panel abierto, lo cierra y
  // libera el scroll: en desktop el header inline sustituye al drawer.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1025px)');

    const handleBreakpointChange = (event) => {
      if (event.matches && openRef.current) closeMenu(false);
    };

    mq.addEventListener('change', handleBreakpointChange);
    return () => mq.removeEventListener('change', handleBreakpointChange);
  }, [closeMenu]);

  // Oculta la barra/header al bajar y la revela al subir, en cualquier layout.
  // No se oculta con el panel abierto: el botón debe seguir accesible.
  useEffect(() => {
    const headerEl = headerRef.current;
    if (!headerEl) return undefined;

    let lastY = window.scrollY;
    let hidden = false;
    let ticking = false;

    const update = () => {
      ticking = false;

      if (openRef.current) {
        if (hidden) {
          hidden = false;
          headerEl.classList.remove('is-hidden');
        }
        lastY = window.scrollY;
        return;
      }

      const y = window.scrollY;
      const delta = y - lastY;

      if (y <= 24) {
        if (hidden) {
          hidden = false;
          headerEl.classList.remove('is-hidden');
        }
      } else if (delta > 6 && y > 80 && !hidden) {
        hidden = true;
        headerEl.classList.add('is-hidden');
      } else if (delta < -6 && hidden) {
        hidden = false;
        headerEl.classList.remove('is-hidden');
      }

      lastY = y;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(
    () => () => {
      openTlRef.current?.kill();
      closeTweenRef.current?.kill();
      textCycleAnimRef.current?.kill();
    },
    []
  );

  return (
    <div
      className={(className ? `${className} ` : '') +
        `staggered-menu-wrapper${isFixed ? ' fixed-wrapper' : ''}`}
      data-position={position}
      data-open={open || undefined}
    >
      <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
        <div className="sm-prelayer sm-prelayer--1" />
        <div className="sm-prelayer sm-prelayer--2" />
      </div>

      <header ref={headerRef} className="staggered-menu-header">
        {desktopInline && (
          <div className="sm-inline">
            <nav className="sm-inline-nav" aria-label="Navegación principal">
              <ul className="sm-inline-list" role="list">
                {items.map((item, index) => (
                  <li key={`${item.label}-${index}`}>
                    <a
                      className="sm-inline-link"
                      href={item.link}
                      aria-label={item.ariaLabel}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            {themeControl && <div className="sm-inline-theme">{themeControl}</div>}
          </div>
        )}
        <div className={`sm-bar${barItems.length ? '' : ' sm-bar--solo'}`}>
          {barItems.map((item, index) => (
            <a
              className="sm-bar-link"
              href={item.link}
              aria-label={item.ariaLabel}
              key={`${item.label}-${index}`}
              onClick={() => closeMenu(true)}
            >
              {item.label}
            </a>
          ))}
          <button
            ref={toggleBtnRef}
            className="sm-toggle"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="staggered-menu-panel"
            onClick={toggleMenu}
            type="button"
          >
            <span className="sm-toggle-textWrap" aria-hidden="true">
              <span ref={textInnerRef} className="sm-toggle-textInner">
                {textLines.map((line, index) => (
                  <span className="sm-toggle-line" key={`${line}-${index}`}>
                    {line}
                  </span>
                ))}
              </span>
            </span>
            <span className="sm-icon" aria-hidden="true">
              <span className="sm-icon-line" />
              <span className="sm-icon-line" />
              <span className="sm-icon-line" />
            </span>
          </button>
        </div>
      </header>

      <aside
        id="staggered-menu-panel"
        ref={panelRef}
        className="staggered-menu-panel"
        aria-hidden={!open}
        aria-label="Menú de navegación"
        inert={!open}
      >
        <div className="sm-panel-inner">
          <nav aria-label="Navegación principal">
            <ul
              className="sm-panel-list"
              role="list"
              data-numbering={displayItemNumbering || undefined}
            >
              {items.length ? (
                items.map((item, index) => (
                  <li className="sm-panel-itemWrap" key={`${item.label}-${index}`}>
                    <a
                      className="sm-panel-item"
                      href={item.link}
                      aria-label={item.ariaLabel}
                      data-index={index + 1}
                      onClick={() => closeMenu(true)}
                    >
                      <span className="sm-panel-itemLabel">{item.label}</span>
                    </a>
                  </li>
                ))
              ) : (
                <li className="sm-panel-itemWrap" aria-hidden="true">
                  <span className="sm-panel-item">
                    <span className="sm-panel-itemLabel">Sin enlaces</span>
                  </span>
                </li>
              )}
            </ul>
          </nav>

          {themeControl && (
            <div className="sm-theme">
              <span className="sm-theme-label">Tema</span>
              {themeControl}
            </div>
          )}

          {displaySocials && socialItems.length > 0 && (
            <div className="sm-socials">
              <h3 className="sm-socials-title">Redes</h3>
              <ul className="sm-socials-list" role="list">
                {socialItems.map((social, index) => (
                  <li className="sm-socials-item" key={`${social.label}-${index}`}>
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link"
                      onClick={() => closeMenu(true)}
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
};

export default StaggeredMenu;
