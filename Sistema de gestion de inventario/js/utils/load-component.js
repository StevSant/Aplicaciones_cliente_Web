import { getElement } from "/js/utils/get-element.js";

export async function loadComponent(id, path) {
  try {
    const html = await fetch(path).then((res) => res.text());

    const target = typeof id === "string" ? getElement(id) : id;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const temp = document.createElement("div");
    temp.innerHTML = html;

    const scripts = temp.querySelectorAll("script");
    scripts.forEach((s) => s.remove());

    const links = temp.querySelectorAll("link[href]");
    links.forEach((link) => {
      const href = link.getAttribute("href");
      if (href && !href.startsWith("/") && !href.startsWith("http")) {
        const absoluteHref = new URL(href, window.location.origin + path)
          .pathname;
        link.setAttribute("href", absoluteHref);
      }
    });

    target.innerHTML = "";
    Array.from(temp.childNodes).forEach((node) => target.appendChild(node));

    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");
      [...oldScript.attributes].forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });

      if (oldScript.src) {
        const url = new URL(oldScript.src, location.origin);
        url.searchParams.set("_", Date.now());
        newScript.src = url.toString();
      } else {
        newScript.textContent = oldScript.textContent;
      }

      document.body.appendChild(newScript);
    });
  } catch (err) {}
}
