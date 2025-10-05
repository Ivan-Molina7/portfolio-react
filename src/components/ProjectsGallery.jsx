import useTranslation from "../hooks/useTranslation";
import { getTextFromKey } from "../utils/getTextFromKey";
import { projectsData } from "../utils/projectsData";
import { Routes, Route, Link } from "react-router-dom";
import Header from "./Header";

export const ProjectsGallery = () => {
    const { texts } = useTranslation();

    const trabajos = projectsData.filter((p) => p.tipo === "trabajo");
    const proyectos = projectsData.filter((p) => p.tipo === "proyecto");

    return (
       
     <>
     
       
        <div className="body--proyecto min-vh-section ">
                            <Header />

            
            <div className="galeria-proyectos max-width-section">
                <div className="wrapper">
                    <div className="galeria-proyectos__filtros">
                        <p className="galeria-proyectos__filtro">Trabajos</p>
                        <p className="galeria-proyectos__filtro">Proyectos</p>
                    </div>

                    <div
                        className="galeria-proyectos__line"
                        data-aos="fade-right"
                        data-aos-delay="500"
                    ></div>
                </div>

                <div className="proyectos__cards proyectos__cards--center">
                    {proyectos.map((proyecto, i) => (
                        <div
                            key={proyecto.id}
                            className="proyectos__card"
                            data-aos="fade-right"
                            data-aos-delay={400 + i * 100}
                        >
                            <img src={proyecto.Logo} alt={getTextFromKey(texts, proyecto.titulo)} />
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
        </div>
     </>
    )
}
