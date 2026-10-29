import { SOCIAL } from "../../utils/assets";
import useTranslation from "../../hooks/useTranslation";

const LINKS = [
  { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/in/ivan-molina-3b0592362/" },
  { key: "github", label: "GitHub", href: "https://github.com/Ivan-Molina7" },
  { key: "behance", label: "Behance", href: "https://www.behance.net/molinaivan" },
];

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
