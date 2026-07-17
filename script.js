const body = document.body;

const menuButton = document.querySelector(".menu-button");

const mobileMenu = document.querySelector(".mobile-menu");

// Mobile navigation
menuButton.addEventListener("click", () => {
  const open = !mobileMenu.classList.contains("open");

  mobileMenu.classList.toggle("open", open);

  body.classList.toggle("menu-open", open);

  mobileMenu.setAttribute(
    "aria-hidden",
    String(!open)
  );

  menuButton.setAttribute(
    "aria-expanded",
    String(open)
  );
});

mobileMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");

    body.classList.remove("menu-open");

    mobileMenu.setAttribute(
      "aria-hidden",
      "true"
    );

    menuButton.setAttribute(
      "aria-expanded",
      "false"
    );
  });
});

// Crossfade hero videos
const heroVideos = [
  ...document.querySelectorAll(".hero-video")
];

let currentVideo = 0;

if (heroVideos.length > 1) {
  setInterval(() => {
    heroVideos[currentVideo].classList.remove("active");

    currentVideo =
      (currentVideo + 1) % heroVideos.length;

    heroVideos[currentVideo].classList.add("active");

    heroVideos[currentVideo]
      .play()
      .catch(() => {});
  }, 9000);
}

// Reveal elements as they enter the screen
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.14
  }
);

document
  .querySelectorAll(".reveal")
  .forEach((element, index) => {
    element.style.transitionDelay =
      `${Math.min((index % 4) * 70, 210)}ms`;

    revealObserver.observe(element);
  });

// Play portfolio videos when hovered
document
  .querySelectorAll(".interactive-card")
  .forEach((card) => {
    const video = card.querySelector("video");

    if (!video) {
      return;
    }

    card.addEventListener("mouseenter", () => {
      video.play().catch(() => {});
    });

    card.addEventListener("mouseleave", () => {
      video.pause();

      video.currentTime = 0;
    });

    // Play videos when visible on phones
    const videoObserver = new IntersectionObserver(
      ([entry]) => {
        const isTouchDevice =
          window.matchMedia("(pointer: coarse)").matches;

        if (!isTouchDevice) {
          return;
        }

        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      {
        threshold: 0.65
      }
    );

    videoObserver.observe(card);
  });

// Custom cursor
const cursor = document.querySelector(".cursor");

const cursorLabel =
  document.querySelector(".cursor-label");

let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  cursor.style.opacity = "1";

  cursor.style.transform =
    `translate(${mouseX - 6}px, ${mouseY - 6}px)`;

  cursorLabel.style.transform =
    `translate(${mouseX - 37}px, ${mouseY - 37}px)`;
});

document
  .querySelectorAll(".interactive-card")
  .forEach((card) => {
    card.addEventListener("mouseenter", () => {
      cursor.style.opacity = "0";

      cursorLabel.style.opacity = "1";
    });

    card.addEventListener("mouseleave", () => {
      cursor.style.opacity = "1";

      cursorLabel.style.opacity = "0";
    });
  });

// Magnetic movement for buttons
document
  .querySelectorAll(".magnetic")
  .forEach((element) => {
    element.addEventListener(
      "mousemove",
      (event) => {
        const rect =
          element.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left -
          rect.width / 2;

        const y =
          event.clientY -
          rect.top -
          rect.height / 2;

        element.style.transform =
          `translate(${x * 0.08}px, ${y * 0.12}px)`;
      }
    );

    element.addEventListener(
      "mouseleave",
      () => {
        element.style.transform =
          "translate(0, 0)";
      }
    );
  });

// Automatically update footer year
document.getElementById("year").textContent =
  new Date().getFullYear();
