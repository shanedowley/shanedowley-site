document.documentElement.classList.add("has-js");

document.querySelectorAll("[data-site-navigation]").forEach((header) => {
  const button = header.querySelector("[data-menu-toggle]");
  const navigation = header.querySelector("[data-menu-panel]");

  if (!(button instanceof HTMLButtonElement) || !(navigation instanceof HTMLElement)) {
    return;
  }

  button.hidden = false;

  const closeMenu = ({ returnFocus = false } = {}) => {
    navigation.dataset.open = "false";
    button.setAttribute("aria-expanded", "false");
    if (returnFocus) button.focus();
  };

  button.addEventListener("click", () => {
    const willOpen = navigation.dataset.open !== "true";
    navigation.dataset.open = String(willOpen);
    button.setAttribute("aria-expanded", String(willOpen));
  });

  header.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navigation.dataset.open === "true") {
      closeMenu({ returnFocus: true });
    }
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });

  window.matchMedia("(min-width: 54.01rem)").addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });
});
