import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root")!;
const root = createRoot(rootEl);

root.render(<App />);


const preloader = document.getElementById("tpi-preloader");
if (preloader) {

  const hide = () => {
  
    requestAnimationFrame(() => {
      preloader.classList.add("tpi-preloader--fade");
      const cleanup = () => preloader.remove();
      preloader.addEventListener("transitionend", cleanup, { once: true });

      setTimeout(cleanup, 1000);
    });
  };
  if (document.readyState === "complete") {
    hide();
  } else {
    window.addEventListener("load", hide, { once: true });
  }
}
