import { useEffect, useRef } from "react";
import { useTranslation } from "../../hooks/useTranslation";
import "./Loader.scss";

export default function Loader() {
  const { t } = useTranslation();
  const loadingTextRef = useRef<HTMLParagraphElement>(null);

  function updateText({ text }: { text: string }) {
    const delay = 150;

    const p = loadingTextRef.current;

    if (!p) {
      console.log("cannot find loading text");
      return;
    }

    p.innerHTML = text
      .split("")
      .map((letter) => {
        console.log(letter);
        return `<span>` + letter + `</span>`;
      })
      .join("");
    Array.from(p.children).forEach((span, index) => {
      setTimeout(() => {
        span.classList.add("wavy");
      }, index * 60 + delay);
    });
  }

  useEffect(() => {
    updateText({ text: t("loading") });
  }, [t("loading")]);

  return (
    <div className="loader-container">
      <div className="loader-background animate-pulse-n-revert-infinite">
        <div className="loader"></div>
      </div>
      <p className="loading wavy" ref={loadingTextRef}>
        {t("loading")}
      </p>
    </div>
  );
}
