const body = document.body;

const menuButton =
  document.querySelector(".menu-button");

const mobileMenu =
  document.querySelector(".mobile-menu");

// MOBILE MENU

menuButton.addEventListener("click", () => {
  const isOpen =
    !mobileMenu.classList.contains("open");

  mobileMenu.classList.toggle(
    "open",
    isOpen
  );

  body.classList.toggle(
    "menu-open",
    isOpen
  );

  mobileMenu.setAttribute(
    "aria-hidden",
    String(!isOpen)
  );

  menuButton.setAttribute(
    "aria-expanded",
    String(isOpen)
  );
});

mobileMenu
  .querySelectorAll("a")
  .forEach((link) => {
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

// HERO VIDEO CROSSFADE

const heroVideos = [
  ...document.querySelectorAll(".hero-video")
];

let currentHeroVideo = 0;

if (heroVideos.length > 1) {
  setInterval(() => {
    heroVideos[currentHeroVideo]
      .classList.remove("active");

    currentHeroVideo =
      (currentHeroVideo + 1) %
      heroVideos.length;

    const nextVideo =
      heroVideos[currentHeroVideo];

    nextVideo.classList.add("active");

    nextVideo
      .play()
      .catch(() => {});
  }, 9000);
}

// REVEAL ANIMATIONS

const revealObserver =
  new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add(
          "visible"
        );

        revealObserver.unobserve(
          entry.target
        );
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
      `${Math.min(
        (index % 4) * 70,
        210
      )}ms`;

    revealObserver.observe(element);
  });

// PROJECT VIDEOS

document
  .querySelectorAll(".interactive-card")
  .forEach((card) => {
    const video =
      card.querySelector("video");

    if (!video) {
      return;
    }

    card.addEventListener(
      "mouseenter",
      () => {
        video
          .play()
          .catch(() => {});
      }
    );

    card.addEventListener(
      "mouseleave",
      () => {
        const continuousVideo =
          video.classList.contains(
            "app-showcase-video"
          ) ||
          video.classList.contains(
            "merch-showcase-video"
          );

        if (continuousVideo) {
          return;
        }

        video.pause();
        video.currentTime = 0;
      }
    );

    const mobileVideoObserver =
      new IntersectionObserver(
        ([entry]) => {
          const isTouchDevice =
            window.matchMedia(
              "(pointer: coarse)"
            ).matches;

          if (!isTouchDevice) {
            return;
          }

          if (entry.isIntersecting) {
            video
              .play()
              .catch(() => {});
          } else {
            video.pause();
          }
        },
        {
          threshold: 0.55
        }
      );

    mobileVideoObserver.observe(card);
  });

// CUSTOM CURSOR

const cursor =
  document.querySelector(".cursor");

const cursorLabel =
  document.querySelector(".cursor-label");

window.addEventListener(
  "mousemove",
  (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    cursor.style.opacity = "1";

    cursor.style.transform =
      `translate(
        ${mouseX - 6}px,
        ${mouseY - 6}px
      )`;

    cursorLabel.style.transform =
      `translate(
        ${mouseX - 38}px,
        ${mouseY - 38}px
      )`;
  }
);

document
  .querySelectorAll(".interactive-card")
  .forEach((card) => {
    card.addEventListener(
      "mouseenter",
      () => {
        cursor.style.opacity = "0";
        cursorLabel.style.opacity = "1";
      }
    );

    card.addEventListener(
      "mouseleave",
      () => {
        cursor.style.opacity = "1";
        cursorLabel.style.opacity = "0";
      }
    );
  });

// MAGNETIC BUTTONS

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
          `translate(
            ${x * 0.08}px,
            ${y * 0.12}px
          )`;
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

// FOOTER YEAR

document.getElementById(
  "year"
).textContent =
  new Date().getFullYear();
