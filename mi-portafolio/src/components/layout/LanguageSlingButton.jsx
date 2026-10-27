// Selector de idioma jugable: un SlingButton que cicla ES -> EN -> PT.
// La URL sigue siendo la fuente de verdad; LanguageRoute sincroniza i18n.
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import SlingButton from '../ui/SlingButton.jsx';
import {
  getLanguage,
  getLanguageFromPath,
  getNextLanguage,
  replaceLanguageInPath
} from '../../i18n/languages.js';
import './LanguageSlingButton.css';

export default function LanguageSlingButton() {
  const { t } = useTranslation();
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  const current = getLanguage(getLanguageFromPath(pathname));
  const next = getNextLanguage(current.code);

  const switchLanguage = () => {
    const target = `${replaceLanguageInPath(pathname, next.code)}${search}${hash}`;
    navigate(target);
  };

  return (
    <SlingButton
      className="language-sling"
      onSend={switchLanguage}
      ariaLabel={t('nav.languageSwitch', {
        current: current.label,
        next: next.label
      })}
      hintText={t('nav.languageHint')}
      size={44}
      strokeWidth={2.5}
      armAt={34}
      maxPull={70}
      launchSpeed={1800}
      recoil={0.2}
      flight={90}
      particles={12}
      spread={70}
      rotateIcon={false}
      padColor="var(--color-text)"
      iconColor="var(--color-bg)"
      accentColor="var(--color-accent-strong)"
      wellColor="var(--color-border)"
      bandColor="var(--color-muted)"
    >
      <span className="language-sling__code" aria-hidden="true">
        {current.code.toUpperCase()}
      </span>
    </SlingButton>
  );
}
