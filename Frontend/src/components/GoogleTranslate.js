import React, { useEffect, useState } from "react";

const languages = [
  'af', 'sq', 'am', 'ar', 'hy', 'az', 'eu', 'be', 'bn', 'bs', 'bg', 'ca', 'ceb', 'ny', 'zh-CN',
  'zh-TW', 'co', 'hr', 'cs', 'da', 'nl', 'en', 'eo', 'et', 'tl', 'fi', 'fr', 'fy', 'gl', 'ka',
  'de', 'el', 'gu', 'ht', 'ha', 'haw', 'iw', 'he', 'hi', 'hmn', 'hu', 'is', 'ig', 'id', 'ga', 'it',
  'ja', 'jw', 'kn', 'kk', 'km', 'ko', 'ku', 'ky', 'lo', 'la', 'lv', 'lt', 'lb', 'mk', 'mg', 'ms',
  'ml', 'mt', 'mi', 'mr', 'mn', 'my', 'ne', 'no', 'or', 'ps', 'fa', 'pl', 'pt', 'pa', 'ro', 'ru',
  'sm', 'gd', 'sr', 'st', 'sn', 'sd', 'si', 'sk', 'sl', 'so', 'es', 'su', 'sw', 'sv', 'tg', 'ta',
  'te', 'th', 'tr', 'uk', 'ur', 'ug', 'uz', 'vi', 'cy', 'xh', 'yi', 'yo', 'zu'
];

const GoogleTranslate = () => {
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadGoogleTranslate = () => {
      try {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: languages.join(','),
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          'google_translate_element'
        );
      } catch (e) {
        setError(true);
      }
    };

    window.loadGoogleTranslate = loadGoogleTranslate;

    if (window.google && window.google.translate) {
      loadGoogleTranslate();
    } else {
      const script = document.createElement('script');
      script.src = '//translate.google.com/translate_a/element.js?cb=loadGoogleTranslate';
      script.async = true;
      script.onerror = () => setError(true);
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <div className="google-trans">
      {error ? (
        <p>Error loading Google Translate widget.</p>
      ) : (
        <div id="google_translate_element" style={{ paddingBottom: '3px' }}>
        </div>
      )}
    </div>
  );
};

export default GoogleTranslate;
