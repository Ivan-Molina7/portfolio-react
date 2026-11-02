import { useEffect, useState } from 'react';
import useTranslation from '../../hooks/useTranslation';
import { SOCIAL } from '../../utils/assets';
import { SOCIAL_LINKS } from '../../utils/socialLinks';

// TODO(Ivan): poner el archivo real en public/cv-ivan-molina.pdf (hoy no existe; en dev, esta ruta
// devuelve el index.html de la SPA).
const CV_PATH = '/cv-ivan-molina.pdf';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Web3Forms: la access key sale de la variable de entorno VITE_WEB3FORMS_KEY (archivo .env en la raíz, ignorado por git;
// en Netlify, Site configuration > Environment variables). Nunca va escrita en el código.
const WEB3FORMS_URL = 'https://api.web3forms.com/submit';
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY;
const EMAIL_SUBJECT = 'Nuevo mensaje desde el portfolio'; // asunto fijo del correo que recibe Ivan
const MISSING_KEY_MSG =
  '[Contacto] Falta VITE_WEB3FORMS_KEY: el formulario no puede enviar mensajes. Creá un archivo .env en la raíz con ' +
  'VITE_WEB3FORMS_KEY=<tu access key de Web3Forms> y reiniciá el servidor de desarrollo (en Netlify: Site configuration > ' +
  'Environment variables, y volvé a desplegar).';
// aviso una sola vez al cargar la página, sin romperla: el formulario se ve igual y al enviar muestra el estado de error
if (!WEB3FORMS_KEY) console.error(MISSING_KEY_MSG);

// Hora de Montevideo en HH:mm (24h), independiente de la zona del visitante.
const clockFormat = new Intl.DateTimeFormat('es-UY', {
  hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Montevideo',
});
const montevideoTime = () => clockFormat.format(new Date());

// Envía el mensaje a Web3Forms (POST JSON). Resuelve si { success: true }; rechaza si falta la key, falla la red
// o el servicio responde con error.
async function sendMessage({ name, email, message }) {
  if (!WEB3FORMS_KEY) throw new Error(MISSING_KEY_MSG);
  const res = await fetch(WEB3FORMS_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ access_key: WEB3FORMS_KEY, subject: EMAIL_SUBJECT, name, email, message }),
  });
  let data = null;
  try { data = await res.json(); } catch { /* respuesta sin JSON */ }
  if (!res.ok || !data?.success) throw new Error(`Web3Forms: ${data?.message || `HTTP ${res.status}`}`);
}

// Devuelve la CLAVE del locale de cada error (no el texto): el texto se resuelve al renderizar,
// así los errores visibles cambian de idioma junto con el resto de la página.
function validate({ name, email, message }) {
  const errors = {};
  if (name.trim().length < 2) errors.name = 'errorNombre';
  if (!EMAIL_RE.test(email.trim())) errors.email = 'errorCorreo';
  const len = message.trim().length;
  if (len < 10 || len > 500) errors.message = 'errorMensaje';
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

    // 1) validar primero: un falso positivo del honeypot nunca debe tapar errores reales
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      setStatus('idle');
      e.currentTarget.elements[Object.keys(found)[0]].focus();
      return;
    }

    // 2) honeypot: un humano no ve este campo; si viene lleno (bot) se descarta sin enviar ni avisar
    if (e.currentTarget.elements.ref_code.value) {
      setValues({ name: '', email: '', message: '' });
      setStatus('success');
      return;
    }

    setStatus('sending');
    try {
      await sendMessage({ name: values.name.trim(), email: values.email.trim(), message: values.message.trim() });
      setValues({ name: '', email: '', message: '' });
      setStatus('success');
    } catch (err) {
      console.error('[Contacto] No se pudo enviar el mensaje:', err);
      setStatus('error');
    }
  };

  // eslint-disable-next-line no-unused-vars -- falso positivo: Tag se usa como componente JSX (<Tag>)
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
      {errors[name] && <span className="cform__err" id={`c-${name}-err`}>{t[errors[name]]}</span>}
    </label>
  );

  return (
    <div className="home-screen" id="contacto" data-s="4">
      <section className="home-wrap" aria-labelledby="contact-titulo">
        <div className="contact-grid">
          <div>
            <h2 className="contact-title" id="contact-titulo">{t.titulo}</h2>
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

            {/* honeypot anti-spam: fuera de pantalla, sin foco y oculto a lectores de pantalla.
                Nombre sin significado ("ref_code") y atributos que los gestores de contraseñas
                respetan (LastPass, 1Password, Bitwarden, Dashlane) para que no lo autocompleten. */}
            <div className="cform__hp" aria-hidden="true">
              <label>
                Ref
                <input
                  type="text"
                  name="ref_code"
                  tabIndex={-1}
                  autoComplete="off"
                  defaultValue=""
                  data-lpignore="true"
                  data-1p-ignore="true"
                  data-bwignore="true"
                  data-form-type="other"
                />
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
      </section>
    </div>
  );
}

export default Contact;
