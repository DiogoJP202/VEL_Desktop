function upsertMeta(selector, attrName, attrValue, content) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Atualiza título e meta tags principais (útil em SPA por rota/idioma).
 * @param {{ title: string, description: string, htmlLang?: string }} opts
 */
export function setPageSeo({ title, description, htmlLang }) {
  if (title) {
    document.title = title;
  }
  if (description) {
    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
  }
  if (title) {
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
  }
  if (htmlLang) {
    document.documentElement.lang = htmlLang;
  }
}
