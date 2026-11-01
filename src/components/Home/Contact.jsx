import { useEffect, useState } from 'react';
import useTranslation from '../../hooks/useTranslation';
import { SOCIAL } from '../../utils/assets';
import { SOCIAL_LINKS } from '../../utils/socialLinks';

// TODO(Ivan): poner el archivo real en public/cv-ivan-molina.pdf (hoy no existe; en dev, esta ruta
// devuelve el index.html de la SPA).
const CV_PATH = '/cv-ivan-molina.pdf';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Hora de Montevideo en HH:mm (24h), independiente de la zona del visitante.
const clockFormat = new Intl.DateTimeFormat('es-UY', {
  hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Montevideo',
});
const montevideoTime = () => clockFormat.format(new Date());

// TODO(servicio de envío): todavía no hay servicio elegido. Conectar acá (fetch al endpoint con
// su key nueva) y resolver si salió bien. Mientras tanto rechaza, y el formulario muestra el estado de error.
async function sendMessage(/* { name, email, message } */) {
  throw new Error('sendMessage: servicio de envío no configurado');
}

function validate({ name, email, message }, t) {
  const errors = {};
  if (name.trim().length < 2) errors.name = t.errorNombre;
  if (!EMAIL_RE.test(email.trim())) errors.email = t.errorCorreo;
  const len = message.trim().length;
  if (len < 10 || len > 500) errors.message = t.errorMensaje;
  return errors;
}

function Contact() {
  const { texts } = useTranslation();
  const t = texts.contacto;

  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [time, setTime] = useState(montevideoTime);

  useEffect(() => {
    const id = setInterval(() => setTime(montevideoTime()), 30000);
    return () => clearInterval(id);
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
    if (status !== 'sending') setStatus('idle');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    // honeypot: un humano no ve este campo; si viene lleno se descarta sin enviar ni avisar
    if (e.currentTarget.elements.website.value) {
      setStatus('success');
      return;
    }

    const found = validate(values, t);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus('idle');
      e.currentTarget.elements[Object.keys(found)[0]].focus();
      return;
    }

    setStatus('sending');
    try {
      await sendMessage({ name: values.name.trim(), email: values.email.trim(), message: values.message.trim() });
      setValues({ name: '', email: '', message: '' });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const field = (name, label, placeholder, Tag = 'input', extra = {}) => (
    <label className="cform__field" htmlFor={`c-${name}`}>
      {label}
      <Tag
        id={`c-${name}`}
        name={name}
        value={values[name]}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={errors[name] ? 'true' : undefined}
        aria-describedby={errors[name] ? `c-${name}-err` : undefined}
        {...extra}
      />
      {errors[name] && <span className="cform__err" id={`c-${name}-err`}>{errors[name]}</span>}
    </label>
  );

  return (
    <div className="home-screen" id="contacto" data-s="4">
      <main className="home-wrap">
        <div className="contact-grid">
          <div>
            <h2 className="contact-title">{t.titulo}</h2>
            <p className="contact-intro">{t.intro}</p>
            <a className="contact-mail" href={`mailto:${t.email}`}>{t.email}</a>
            <i className="contact-rule" aria-hidden="true" />
            <div className="contact-soc">
              {SOCIAL_LINKS.map((l, i) => (
                <a key={l.key} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} style={{ '--i': i }}>
                  <img src={SOCIAL[l.key]} alt="" width="16" height="16" />
                </a>
              ))}
            </div>
            <div className="contact-cvrow">
              <a className="home-btn" href={CV_PATH} download>
                {t.cvBoton} <small>{t.cvTipo}</small>
              </a>
              <span className="contact-clock">
                <i aria-hidden="true" />
                {t.reloj} · <b>{time}</b>
              </span>
            </div>
          </div>

          <form className="cform" onSubmit={onSubmit} noValidate>
            <h3 className="cform__title">{t.formTitulo}</h3>
            {field('name', t.labelNombre, t.placeholderNombre, 'input', { type: 'text', autoComplete: 'name', maxLength: 50 })}
            {field('email', t.labelCorreo, t.placeholderCorreo, 'input', { type: 'email', autoComplete: 'email' })}
            {field('message', t.labelMensaje, t.placeholderMensaje, 'textarea', { maxLength: 500 })}

            {/* honeypot anti-spam: fuera de pantalla, sin foco y oculto a lectores de pantalla */}
            <div className="cform__hp" aria-hidden="true">
              <label>
                Website
                <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
              </label>
            </div>

            <div className="cform__row">
              <button type="submit" className="home-btn home-btn--solid" disabled={status === 'sending'}>
                {status === 'sending' ? t.btnEnviando : t.btnEnviar}
              </button>
              <p className={`cform__status cform__status--${status}`} role="status" aria-live="polite">
                {status === 'success' && t.exito}
                {status === 'error' && t.error}
              </p>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Contact;
