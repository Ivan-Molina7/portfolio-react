function Objetivos({objetivo1, objetivo2, objetivo3}) {
  return (
    <section className="proyecto-objetivos mb-section max-width-section">
      <h2
        className="proyecto-objetivos__titulo"
        data-aos="fade-right"
        data-aos-delay="100"
      >
        Objetivos del proyecto
      </h2>
      <div className="proyecto-objetivos__items">
        <div
          className="proyecto-objetivos__item"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <h3 className="proyecto-objetivos__item-titulo">1.</h3>
          <p
            className="proyecto-objetivos__item-texto"
          >
           {objetivo1}
          </p>
        </div>
        <div
          className="proyecto-objetivos__item"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <h3 className="proyecto-objetivos__item-titulo">2.</h3>
          <p
            className="proyecto-objetivos__item-texto"
          >
            {objetivo2}
          </p>
        </div>
        <div
          className="proyecto-objetivos__item"
          data-aos="fade-right"
          data-aos-delay="200"
        >
          <h3 className="proyecto-objetivos__item-titulo">3.</h3>
          <p
            className="proyecto-objetivos__item-texto"
          >
            {objetivo3}
          </p>
        </div>
      </div>
    </section>
  );
}

export default Objetivos;
