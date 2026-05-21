import { useEffect } from "react";
import { initAos } from "../utils/initAos.js";

/** AOS — только после прелоадера, чтобы не лагало на старте. */
export function useSiteReady(ready) {
  useEffect(() => {
    if (!ready) return undefined;
    const id = window.requestAnimationFrame(() => initAos());
    return () => window.cancelAnimationFrame(id);
  }, [ready]);
}
