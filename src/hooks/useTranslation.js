import { useContext } from 'react';
import TranslationContext from '../contexts/TranslationContext';

const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation debe usarse dentro de TranslationProvider');
  }
  return context;
};

export default useTranslation;
