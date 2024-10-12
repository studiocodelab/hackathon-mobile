
  import i18n from "i18next";
  import { initReactI18next } from "react-i18next";
  import * as en from './translations/en.json'
  import * as pl from './translations/pl.json'

  const resources = {en: en, pl: pl}

  i18n.use(initReactI18next).init({
    compatibilityJSON: "v3",
    resources: {
      ...Object.entries(resources).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: {
            translation: value,
          },
        }),
        {}
      ),
    },
    lng: "pl",
  });

  export default i18n;
  