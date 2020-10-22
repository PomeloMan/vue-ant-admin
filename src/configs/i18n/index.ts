import Vue from 'vue';
import VueI18n from 'vue-i18n';
import CONSTANT from '../constant';

Vue.use(VueI18n);

function loadLocaleMessages() {
  const locales = require.context(
    '../../assets/locales',
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  );
  const messages: any = {};
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key);
    }
  });
  return messages;
}

export default new VueI18n({
  locale: CONSTANT.DEFAULT_LOCALE_KEY,
  fallbackLocale: CONSTANT.DEFAULT_LOCALE_KEY,
  messages: loadLocaleMessages(),
  silentTranslationWarn: true,
  silentFallbackWarn: true
});
