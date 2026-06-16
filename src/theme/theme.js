// ─── Gestion centralisée du thème clair / sombre ────────────────────────────
// Source de vérité unique partagée par TOUTES les pages (Dashboard inclus).
// Le thème est appliqué directement sur <html> : les classes `.dark-mode` /
// `.light-mode` et l'attribut `data-bs-theme` sont lus par le CSS du template
// (app527b.css / Bootstrap 5.3), donc aucun re-render React n'est nécessaire
// pour que le changement soit visible.
//
// La clé localStorage "theme" est identique à celle utilisée historiquement
// par le Dashboard, ce qui garantit la cohérence d'une page à l'autre.

const STORAGE_KEY = "theme";

/** Applique le thème sur <html> et le persiste dans localStorage. */
export function applyTheme(isDark) {
  const root = document.documentElement;
  if (isDark) {
    root.setAttribute("data-bs-theme", "dark");
    root.classList.add("dark-mode");
    root.classList.remove("light-mode");
  } else {
    root.setAttribute("data-bs-theme", "light");
    root.classList.remove("dark-mode");
    root.classList.add("light-mode");
  }
  try {
    localStorage.setItem(STORAGE_KEY, isDark ? "dark" : "light");
  } catch (_) {}
}

/** Retourne true si le mode sombre est actuellement actif (d'après localStorage). */
export function isDarkTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "dark";
  } catch (_) {
    return false;
  }
}

/** Bascule entre clair et sombre. À brancher sur le bouton thème de chaque page. */
export function toggleTheme() {
  applyTheme(!isDarkTheme());
}

/** Réapplique le thème persisté (à appeler au montage d'une page si besoin). */
export function initTheme() {
  applyTheme(isDarkTheme());
}
