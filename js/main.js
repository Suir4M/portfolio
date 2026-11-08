// Portfolio – interactions : menu mobile, apparition des sections, lien de navigation actif.

const menuButton = document.querySelector(".nav-toggle");
const navigation = document.getElementById("menu");

function setNavigationOpen(isOpen, { restoreFocus = false } = {}) {
  navigation.classList.toggle("is-open", isOpen);
  menuButton.setAttribute("aria-expanded", String(isOpen));
  if (!isOpen && restoreFocus) menuButton.focus();
}

menuButton.addEventListener("click", () => {
  setNavigationOpen(!navigation.classList.contains("is-open"));
});

navigation.addEventListener("click", (event) => {
  if (event.target.closest("a")) setNavigationOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigation.classList.contains("is-open")) {
    setNavigationOpen(false, { restoreFocus: true });
  }
});

// Fait apparaître chaque bloc une seule fois, quand il entre dans l'écran.
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    revealObserver.unobserve(entry.target);
  });
}, { rootMargin: "0px 0px -8% 0px" });

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

// Souligne dans le menu la section actuellement lue.
const navigationLinks = [...navigation.querySelectorAll("a")];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navigationLinks.forEach((link) => {
      link.classList.toggle("is-current", link.hash === `#${entry.target.id}`);
    });
  });
}, { rootMargin: "-45% 0px -50% 0px" });

navigationLinks.forEach((link) => {
  const section = document.querySelector(link.hash);
  if (section) sectionObserver.observe(section);
});
