import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root")!;
const root = createRoot(rootEl);

root.render(<App />);

// After initial mount, fade out and remove the preloader
const preloader = document.getElementById("tpi-preloader");
if (preloader) {
  // keep visible for 20 seconds (temporary per request), then fade out
  setTimeout(() => {
    // allow a tick so layout paints before starting transition
    requestAnimationFrame(() => {
      preloader.classList.add("tpi-preloader--fade");
      const cleanup = () => preloader.remove();
      preloader.addEventListener("transitionend", cleanup, { once: true });
      // safety removal in case transition event doesn't fire
      setTimeout(cleanup, 800);
    });
  }, 20000);
}
