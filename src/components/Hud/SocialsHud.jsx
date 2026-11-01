import { SOCIAL } from "../../utils/assets";
import useTranslation from "../../hooks/useTranslation";
import { SOCIAL_LINKS as LINKS } from "../../utils/socialLinks";

export default function SocialsHud() {
  const { texts } = useTranslation();
  return (
    <nav className="hud-socials" aria-label={texts.hud.redes}>
      {LINKS.map((l) => (
        <a key={l.key} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label}>
          <img src={SOCIAL[l.key]} alt="" width="19" height="19" />
        </a>
      ))}
    </nav>
  );
}
