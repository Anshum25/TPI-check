import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root")!;
const root = createRoot(rootEl);

root.render(<App />);

// Handle splash preloader: wait for both window load and home content readiness,
// show for at least a minimum duration on first visit, and only
// play the full animation once per session.
const preloader = document.getElementById("tpi-preloader");
if (preloader) {
  const MIN_DISPLAY_MS = 5000; // minimum time to keep splash visible on first load
  const startTime = performance.now();
  const isHomeRoute = window.location.pathname === "/" || window.location.pathname === "/index.html";
  const isAdminRoute = window.location.pathname.startsWith("/admin");

  const markLoaded = () => {
    document.documentElement.classList.add("tpi-loaded");
  };

  const animateAndHide = () => {
    requestAnimationFrame(() => {
      preloader.classList.add("tpi-preloader--fade");
      const cleanup = () => {
        preloader.remove();
        markLoaded();
      };
      preloader.addEventListener("transitionend", cleanup, { once: true });
      // Fallback in case transitionend doesn't fire
      setTimeout(cleanup, 1000);
    });
  };

  // For the admin panel, skip the long branded splash and show the UI as soon as possible.
  if (isAdminRoute) {
    animateAndHide();
  } else {
    let windowLoaded = document.readyState === "complete";
    // Only wait for explicit home-ready signal on the actual home route.
    // For routes like /admin, we don't get that event, so treat as ready.
    let homeReady = !isHomeRoute;

    const tryHide = () => {
      if (windowLoaded && homeReady) {
        const elapsed = performance.now() - startTime;
        const remaining = MIN_DISPLAY_MS - elapsed;

        const finish = () => {
          window.removeEventListener("load", onWindowLoad);
          if (isHomeRoute) {
            window.removeEventListener("tpi-home-ready", onHomeReady as EventListener);
          }
          animateAndHide();
        };

        if (remaining > 0) {
          setTimeout(finish, remaining);
        } else {
          finish();
        }
      }
    };

    const onWindowLoad = () => {
      windowLoaded = true;
      tryHide();
    };

    const onHomeReady = () => {
      homeReady = true;
      tryHide();
    };

    if (!windowLoaded) {
      window.addEventListener("load", onWindowLoad, { once: true });
    }

    if (isHomeRoute) {
      window.addEventListener("tpi-home-ready", onHomeReady as EventListener, { once: true });
    }
  }
}
