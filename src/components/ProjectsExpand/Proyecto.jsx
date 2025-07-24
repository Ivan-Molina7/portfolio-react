import Header from "../Header";
import Faq from "./Faq";
import HeroExpand from "./HeroExpand";
import Objetivos from "./Objetivos";
import Tecnologias from "./Tecnologias";

import { useParams } from 'react-router-dom';
import { projectsData } from '../../utils/projectsData';
import useTranslation from '../../hooks/useTranslation';
import { getTextFromKey } from '../../utils/getTextFromKey';



function Proyecto() {
  const { id } = useParams();
  const { texts } = useTranslation();

  const proyecto = projectsData.find(p => p.id.toString() === id);


  if (!proyecto) {
    return (
      <>
        <Header />
        <div style={{ padding: '2rem' }}>
          <h2>{texts.error.proyectoNoEncontrado || "Proyecto no encontrado"}</h2>
        </div>
      </>
    );
  }

  const titulo = proyecto.titulo
  const descripcion = getTextFromKey(texts, proyecto.descripcionKey);

  const objetivo1 = getTextFromKey(texts, proyecto.objetivo1Key);
  const objetivo2 = getTextFromKey(texts, proyecto.objetivo2Key);
  const objetivo3 = getTextFromKey(texts, proyecto.objetivo3Key);
  const pregunta1 = getTextFromKey(texts, proyecto.pregunta1Key);
  const respuesta1 = getTextFromKey(texts, proyecto.respuesta1Key);
  const pregunta2 = getTextFromKey(texts, proyecto.pregunta2Key);
  const respuesta2 = getTextFromKey(texts, proyecto.respuesta2Key);
  const pregunta3 = getTextFromKey(texts, proyecto.pregunta3Key);
  const respuesta3 = getTextFromKey(texts, proyecto.respuesta3Key);


  return (
    <>
      <div className="body--proyecto">


        <Header />
        <HeroExpand titulo={titulo} descripcion={descripcion} />
        <Objetivos objetivo1={objetivo1} objetivo2={objetivo2} objetivo3={objetivo3} />
        <Tecnologias />
        <Faq
          pregunta1={pregunta1}
          respuesta1={respuesta1}
          pregunta2={pregunta2}
          respuesta2={respuesta2}
          pregunta3={pregunta3}
          respuesta3={respuesta3}
        />
      </div>
    </>
  );
}

export default Proyecto;
