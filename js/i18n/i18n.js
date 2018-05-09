import I18n from 'react-native-i18n';
import en from './locales/en';
import fr from './locales/fr';
import ar from './locales/ar';

I18n.fallbacks = true;

I18n.translations = {
  en,  
  ar,
  fr
};

export default I18n;
