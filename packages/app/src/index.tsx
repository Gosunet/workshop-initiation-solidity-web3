import React from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { ServiceWorkerProvider } from "./useServiceWorker";
import * as serviceWorker from "./sw";
import App from "./App";

import "pwacompat";

serviceWorker.unregisterOnUncatchError();

const root = createRoot(document.getElementById("root")!);
root.render(
  <ServiceWorkerProvider>
    <App />
  </ServiceWorkerProvider>
);
