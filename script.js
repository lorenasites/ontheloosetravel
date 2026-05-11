// Fade in navbar background on scroll
window.addEventListener("scroll", function () {
  const nav = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    nav.style.backgroundColor = "rgba(158, 143, 122, 0.95)";
    nav.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
  } else {
    nav.style.backgroundColor = "transparent";
    nav.style.boxShadow = "none";
  }
});

// Subtle parallax for hero text
window.addEventListener("scroll", function () {
  const heroContent = document.querySelector(".hero-content");
  let scrollVal = window.scrollY;
  heroContent.style.transform = `translateY(${scrollVal * 0.3}px)`;
  heroContent.style.opacity = 1 - scrollVal / 600;
});

// Subtle Parallax for the 'Car' Spotlight Image
window.addEventListener("scroll", function () {
  const carImage = document.querySelector(".hero-car-image");
  const heroContent = document.querySelector(".hero-content");
  let scrollVal = window.scrollY;

  // Moves the car image slightly to create depth
  if (carImage) {
    carImage.style.transform = `scale(1.1) translateY(${scrollVal * 0.15}px)`;
  }

  // Fades and lifts the text
  if (heroContent) {
    heroContent.style.transform = `translateY(${scrollVal * -0.2}px)`;
    heroContent.style.opacity = 1 - scrollVal / 700;
  }
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Offset for the sticky navbar (adjust 80 to match your navbar height)
      const offset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Close the mobile menu automatically after a link is clicked
      const navCheckbox = document.getElementById("nav-check");
      if (navCheckbox) {
        navCheckbox.checked = false;
      }
    }
  });
});

document.querySelectorAll("a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    // If it's a redirect to services.html, add a soft fade-out feel
    if (href === "services.html") {
      e.preventDefault();
      document.body.style.opacity = "0.5"; // Visual cue the page is changing
      document.body.style.transition = "opacity 0.3s ease";

      setTimeout(() => {
        window.location.href = href;
      }, 300); // 300ms delay for a smoother "hand-off"
    }
  });
});
