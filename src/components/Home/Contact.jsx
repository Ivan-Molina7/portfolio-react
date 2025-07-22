import githubIcon from '../../assets/img/Icons/White/github.png';
import behanceIcon from '../../assets/img/Icons/White/behance.png';
import linkedinIcon from '../../assets/img/Icons/White/linkedin.png';

import Background from '../../assets/img/Backgrounds/bg8.webp';

function Contact() {
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
            data-section="contacto"
            data-value="titulo"
          >
            CONTACTO
          </h2>
          <div
            className="contacto__info"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <p
              className="contacto__email"
              data-section="contacto"
              data-value="email"
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
            <label htmlFor="name" data-section="contacto" data-value="labelNombre">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Nombre"
              className="form__input"
              required
              minLength="2"
              maxLength="50"
              data-input="contacto"
              data-value="placeholderNombre"
            />
          </div>

          <div className="form__group" data-aos="fade-up" data-aos-delay="600">
            <label htmlFor="email" data-section="contacto" data-value="labelCorreo">
              Correo
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="form__input"
              required
              data-input="contacto"
              data-value="placeholderCorreo"
            />
          </div>

          <div className="form__group" data-aos="fade-up" data-aos-delay="700">
            <label
              htmlFor="message"
              data-section="contacto"
              data-value="labelMensaje"
            >
              Mensaje
            </label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="10"
              placeholder="Mensaje..."
              className="form__input"
              required
              minLength="10"
              maxLength="500"
              data-input="contacto"
              data-value="placeholderMensaje"
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
            data-section="contacto"
            data-value="btnEnviar"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            Enviar
          </button>
        </form>
      </section>
    </div>
  );
}

export default Contact;
