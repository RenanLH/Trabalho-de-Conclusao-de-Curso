import { useEffect } from "react";

declare global {
  interface Window {
    google: any;
  }
}

const GoogleTranslate = () => {
  useEffect(() => {
    let tentativas = 0;
    const interval = setInterval(() => {
      tentativas++;
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          { pageLanguage: "pt-PT", autoDisplay: false },
          "google_translate_element"
        );
        clearInterval(interval);
      }
      if (tentativas > 20) clearInterval(interval);

    }, 100);

    return () => clearInterval(interval);
  }, []);


  return <div id="google_translate_element" className="hidden" />;
};

export default GoogleTranslate;
