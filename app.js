(function () {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);

    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  const scrollto = (el) => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  on(
    "click",
    "#navbar .nav-link",
    function (e) {
      let section = select(this.hash);
      if (section) {
        e.preventDefault();

        let navbar = select("#navbar");
        let header = select("#header");
        let sections = select("section", true);
        let navlinks = select("#navbar .nav-link", true);

        navlinks.forEach((item) => {
          item.classList.remove("active");
        });

        this.classList.add("active");

        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );
})();

document.addEventListener("DOMContentLoaded", function () {
  // Tüm nav-link'leri seç
  const navLinks = document.querySelectorAll("#navbar .nav-link");

  // Her bir nav-link'e tıklama olayı ekle
  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Tıklanan bağlantının href değerini al
      const targetSectionId = link.getAttribute("href").substring(1);

      // Tüm section'ları gizle
      const sections = document.querySelectorAll(".section");
      sections.forEach(function (section) {
        section.classList.remove("section-show");
      });

      // Hedef section'ı göster
      const targetSection = document.getElementById(targetSectionId);
      if (targetSection) {
        targetSection.classList.add("section-show");
      }

      // Tüm nav-link'leri temizle
      navLinks.forEach(function (navLink) {
        navLink.classList.remove("active");
      });

      // Tıklanan nav-link'e active class'ını ekle
      link.classList.add("active");

      // Sayfayı hedef section'a kaydır
      window.scrollTo({
        top: targetSection.offsetTop - 100,
        behavior: "smooth",
      });
    });
  });
});

function showContent(contentId) {
  // Tüm içerikleri gizle
  var allContents = document.querySelectorAll(".content");
  allContents.forEach(function (content) {
    content.style.display = "none";
  });
  

  // Belirli içeriği göster
  var selectedContent = document.getElementById("content" + contentId);
  if (selectedContent) {
    selectedContent.style.display = "block";
  }
  
}


function hideContent(contentId) {
  // Belirli içeriği gizle
  var selectedContent = document.getElementById("content" + contentId);
  if (selectedContent) {
    selectedContent.style.display = "none";
  }
}

