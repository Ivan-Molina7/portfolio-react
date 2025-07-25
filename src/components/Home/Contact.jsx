import githubIcon from '../../assets/img/Icons/White/github.png';
import behanceIcon from '../../assets/img/Icons/White/behance.png';
import linkedinIcon from '../../assets/img/Icons/White/linkedin.png';

import Background from '../../assets/img/Backgrounds/bg8.webp';
import useTranslation from '../../hooks/useTranslation';

function Contact() {
  const { texts } = useTranslation();


  return (
    <div className="overflow-section-100vh" id="contacto">
      <section
        className="contacto max-width-section section-bg"
        data-bg={Background}
      >
        <div
          className="contacto__content"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          <h2
            className="contacto__title title-section"
          >
                {texts.contacto.titulo}
          </h2>
          <div
            className="contacto__info"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <p
              className="contacto__email"
            >
              contacto.ivanmolina@gmail.com
            </p>
            <div className="contacto__line"></div>
            <div
              className="contacto__redes"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <a
                href="https://www.linkedin.com/in/ivan-molina-3b0592362/"
                target="_blank"
                aria-label="LinkedIn"
              >
                <img
                      src={linkedinIcon}
                  alt="LinkedIn Icon"
                />
              </a>
              <a
                href="https://github.com/Ivan-Molina7"
                target="_blank"
                aria-label="GitHub"
              >
                <img
              src={githubIcon}
                  alt="GitHub Icon"
                />
              </a>
              <a
                href="https://www.behance.net/molinaivan"
                target="_blank"
                aria-label="Behance"
              >
                <img
                  src={behanceIcon}
                  alt="Behance Icon"
                />
              </a>
            </div>
          </div>
        </div>

        <form
          className="form"
          method="POST"
          action="https://api.web3forms.com/submit"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <input
            type="hidden"
            name="access_key"
            value="f9b982a7-20af-4da7-a1ee-5c4decd2081e"
          />

          <div className="form__group" data-aos="fade-up" data-aos-delay="500">
            <label htmlFor="name" >
              {texts.contacto.labelNombre}
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder={texts.contacto.placeholderNombre}
              className="form__input"
              required
              minLength="2"
              maxLength="50" 
            />
          </div>

          <div className="form__group" data-aos="fade-up" data-aos-delay="600">
            <label htmlFor="email" >
              {texts.contacto.labelCorreo}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder={texts.contacto.placeholderCorreo}
              className="form__input"
              required
            />
          </div>

          <div className="form__group" data-aos="fade-up" data-aos-delay="700">
            <label
              htmlFor="message"
            >
              {texts.contacto.labelMensaje}
            </label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="10"
              placeholder={texts.contacto.placeholderMensaje}
              className="form__input"
              required
              minLength="10"
              maxLength="500"
            ></textarea>
          </div>

          <input type="checkbox" name="botcheck" style={{display: 'none'}} />

          <input
            type="hidden"
            name="redirect"
            value="https://ivanmolina.netlify.app/"
          />

          <button
            type="submit"
            className="btn btn--submit"
            data-aos="fade-up"
            data-aos-delay="800 "
          >
            {texts.contacto.btnEnviar}
          </button>
        </form>
      </section>
    </div>
  );
}

export default Contact;
