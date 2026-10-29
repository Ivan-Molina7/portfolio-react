import useTranslation from "../hooks/useTranslation";
import { getTextFromKey } from "../utils/getTextFromKey";
import { projectsData } from "../utils/projectsData";
import { Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export const ProjectsGallery = () => {
    const { texts } = useTranslation();

    const [typeProject, setTypeProject] = useState(
      "proyectos"
    );

      useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, []);
    

    const handleTypeProject = (type) => {
        setTypeProject(type);
    };

    const trabajos = projectsData.filter((p) => p.tipo === "trabajo");
    const proyectos = projectsData.filter((p) => p.tipo === "proyecto");



    return (
       
     <>
     
       
        <div className=" min-vh-section body--galeria-proyectos">

            
            <div className="galeria-proyectos max-width-section">
                <div className="wrapper">
                    <div className="galeria-proyectos__filtros">
                       
                        <p 
                        className="galeria-proyectos__filtro" 
                        onClick={() => handleTypeProject("trabajos")}
                        style={{
                            opacity: typeProject === "trabajos" ? 1 : 0.4
                        }}
                        data-aos="fade-right"
                        data-aos-delay="100"
                        >
                        Trabajos</p>

                        <p 
                        className="galeria-proyectos__filtro"  
                        data-aos="fade-right"
                        data-aos-delay="100"
                        onClick={() => handleTypeProject("proyectos")}
                        style={{
                            opacity: typeProject === "proyectos" ? 1 : 0.4
                        }}
           
                        >Proyectos</p>
                    </div>

                    <div
                        className="galeria-proyectos__line"
                        data-aos="fade-right"
                        data-aos-delay="300"
                    ></div>
                </div>

                <div className={`proyectos__cards proyectos__cards--center proyectos__cards--display ${typeProject === "trabajos" ? `active` : ``}`}>
                      {trabajos.map((proyecto, i) => (
                        <div
                            key={proyecto.id}
                            className="proyectos__card"
                            data-aos="fade-right"
                            data-aos-delay={400 + i * 100}
                        >
                            {proyecto.Logo ? (
                                <img src={proyecto.Logo} alt={getTextFromKey(texts, proyecto.titulo)} />
                            ) : (
                                <span className="proyectos__card-titulo">{proyecto.titulo}</span>
                            )}
                            {proyecto.enDesarrollo && (
                                <span className="proyectos__card-estado">{texts.proyecto.enDesarrollo}</span>
                            )}
                            {/* Si queres navegación SPA (React Router): */}
                            <Link to={`/proyecto/${proyecto.id}`} className="btn btn--proyectos">
                                {texts.proyectos.expandirBtn}
                            </Link>
                            {/* Si necesitas href tradicional (menos recomendable): */}
                            {/* <a href={`/proyectos/${proyecto.id}.html`} className="btn btn--proyectos">{texts.proyectos.expandirBtn}</a> */}
                        </div>
                    ))}

                </div>

                <div className={`proyectos__cards proyectos__cards--center proyectos__cards--display ${typeProject === "proyectos" ? `active` : ``}`}>
                      {proyectos.map((proyecto, i) => (
                        <div
                            key={proyecto.id}
                            className="proyectos__card"
                            data-aos="fade-right"
                            data-aos-delay={400 + i * 100}
                        >
                            {proyecto.Logo ? (
                                <img src={proyecto.Logo} alt={getTextFromKey(texts, proyecto.titulo)} />
                            ) : (
                                <span className="proyectos__card-titulo">{proyecto.titulo}</span>
                            )}
                            {proyecto.enDesarrollo && (
                                <span className="proyectos__card-estado">{texts.proyecto.enDesarrollo}</span>
                            )}
                            {/* Si queres navegación SPA (React Router): */}
                            <Link to={`/proyecto/${proyecto.id}`} className="btn btn--proyectos">
                                {texts.proyectos.expandirBtn}
                            </Link>
                            {/* Si necesitas href tradicional (menos recomendable): */}
                            {/* <a href={`/proyectos/${proyecto.id}.html`} className="btn btn--proyectos">{texts.proyectos.expandirBtn}</a> */}
                        </div>
                    ))}

                </div>
            </div>

            <div className="template"></div>
        </div>
     </>
    )
}
