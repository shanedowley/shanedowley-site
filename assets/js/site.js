document.documentElement.classList.add("has-js");

document.querySelectorAll("[data-site-navigation]").forEach((header) => {
  const button = header.querySelector("[data-menu-toggle]");
  const navigation = header.querySelector("[data-menu-panel]");
  const aboutMenu = header.querySelector("[data-about-menu]");
  const aboutButton = header.querySelector("[data-about-toggle]");
  const aboutSubmenu = header.querySelector("[data-about-submenu]");

  if (!(button instanceof HTMLButtonElement) || !(navigation instanceof HTMLElement)) {
    return;
  }

  button.hidden = false;

  const hasAboutMenu =
    aboutMenu instanceof HTMLElement &&
    aboutButton instanceof HTMLButtonElement &&
    aboutSubmenu instanceof HTMLElement;

  const closeAboutMenu = ({ returnFocus = false } = {}) => {
    if (!hasAboutMenu) return;
    aboutSubmenu.dataset.open = "false";
    aboutButton.setAttribute("aria-expanded", "false");
    if (returnFocus) aboutButton.focus();
  };

  if (hasAboutMenu) {
    aboutButton.hidden = false;
    aboutButton.addEventListener("click", () => {
      const willOpen = aboutButton.getAttribute("aria-expanded") !== "true";
      aboutSubmenu.dataset.open = String(willOpen);
      aboutButton.setAttribute("aria-expanded", String(willOpen));
    });

    document.addEventListener("click", (event) => {
      if (event.target instanceof Node && !aboutMenu.contains(event.target)) {
        closeAboutMenu();
      }
    });
  }

  const closeMenu = ({ returnFocus = false } = {}) => {
    closeAboutMenu();
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
    if (event.key !== "Escape") return;

    if (hasAboutMenu && aboutButton.getAttribute("aria-expanded") === "true") {
      closeAboutMenu({ returnFocus: true });
    } else if (navigation.dataset.open === "true") {
      closeMenu({ returnFocus: true });
    }
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeMenu();
    }
  });

  window.matchMedia("(min-width: 54.01rem)").addEventListener("change", (event) => {
    if (event.matches) closeMenu();
  });
});
