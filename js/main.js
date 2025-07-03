// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
});

// Duration Range Slider
const durationRange = document.getElementById("duration-range");
const durationValue = document.getElementById("duration-value");

if (durationRange && durationValue) {
  durationRange.addEventListener("input", function () {
    durationValue.textContent = this.value;
  });
}

// Navigation Tab Switching
const navTabs = document.querySelectorAll(".nav-tab");
const heroVideo = document.querySelector("#hero video");

// Video sources for different categories
const videoSources = {
  beaches: "adventure.mp4",
  heritage: "culture.mp4",
  nightlife: "cruise.mp4",
  culture: "culture.mp4",
};

navTabs.forEach((tab) => {
  tab.addEventListener("click", function () {
    // Remove active class from all tabs
    navTabs.forEach((t) => {
      t.classList.remove("active");
      t.classList.remove("bg-white", "bg-opacity-80");
      t.classList.add("bg-black", "bg-opacity-50");
      t.querySelector("span").classList.remove("text-gray-800");
      t.querySelector("span").classList.add("text-white");
    });

    // Add active class to clicked tab
    this.classList.add("active");
    this.classList.remove("bg-black", "bg-opacity-50");
    this.classList.add("bg-white", "bg-opacity-80");
    this.querySelector("span").classList.remove("text-white");
    this.querySelector("span").classList.add("text-gray-800");

    // Change video source
    const category = this.dataset.category;
    if (heroVideo && videoSources[category]) {
      heroVideo.src = videoSources[category];
      heroVideo.load();
    }
  });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", function () {
    // Create mobile menu if it doesn't exist
    if (!document.getElementById("mobile-menu")) {
      const nav = document.querySelector("nav .container");
      const mobileMenuDiv = document.createElement("div");
      mobileMenuDiv.id = "mobile-menu";
      mobileMenuDiv.className =
        "md:hidden bg-black bg-opacity-90 absolute top-full left-0 w-full py-4 hidden";
      mobileMenuDiv.innerHTML = `
                <div class="flex flex-col space-y-4 px-6">
                    <a href="#destinations" class="text-white hover:text-orange-300 transition-colors">Destinations</a>
                    <a href="#experiences" class="text-white hover:text-orange-300 transition-colors">Experiences</a>
                    <a href="#packages" class="text-white hover:text-orange-300 transition-colors">Packages</a>
                    <a href="#culture" class="text-white hover:text-orange-300 transition-colors">Culture</a>
                    <a href="#contact" class="text-white hover:text-orange-300 transition-colors">Contact</a>
                </div>
            `;
      nav.appendChild(mobileMenuDiv);
    }

    const menu = document.getElementById("mobile-menu");
    menu.classList.toggle("hidden");
  });
}

// Video Play Functionality
function playVideo(button) {
  const videoContainer = button.parentElement;
  const video = videoContainer.querySelector("video");

  if (video.paused) {
    video.play();
    button.style.display = "none";

    video.addEventListener("pause", function () {
      button.style.display = "flex";
    });

    video.addEventListener("ended", function () {
      button.style.display = "flex";
    });
  }
}

// Reasons Swiper
const reasonsSwiper = new Swiper(".reasons-swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 1,
    },
  },
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Parallax Effect for Hero Section
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector("#hero");
  const heroVideo = hero.querySelector("video");

  if (heroVideo) {
    heroVideo.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Navbar Background on Scroll
window.addEventListener("scroll", function () {
  const nav = document.querySelector("nav");
  if (window.scrollY > 100) {
    nav.classList.add("bg-black", "bg-opacity-80");
    nav.classList.remove("bg-transparent");
  } else {
    nav.classList.remove("bg-black", "bg-opacity-80");
    nav.classList.add("bg-transparent");
  }
});

// Intersection Observer for Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-in");
    }
  });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll(".card-hover, .section-spacing > *").forEach((el) => {
  observer.observe(el);
});

// Form Validation
document.addEventListener("DOMContentLoaded", function () {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic form validation
      const inputs = form.querySelectorAll("input[required], select[required]");
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add("border-red-500");
        } else {
          input.classList.remove("border-red-500");
        }
      });

      if (isValid) {
        // Show success message or submit form
        alert("Thank you for your inquiry! We will contact you soon.");
        form.reset();
      } else {
        alert("Please fill in all required fields.");
      }
    });
  });
});

// Image Lazy Loading
document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("opacity-0");
        img.classList.add("opacity-100");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
});

// Social Media Integration
function shareOnSocialMedia(platform, url, text) {
  let shareUrl;

  switch (platform) {
    case "facebook":
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
      break;
    case "twitter":
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      break;
    case "whatsapp":
      shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
      break;
    case "instagram":
      // Instagram doesn't support direct sharing via URL
      alert("Please share manually on Instagram");
      return;
  }

  window.open(shareUrl, "_blank", "width=600,height=400");
}

// Search Functionality
function initSearch() {
  const searchInput = document.getElementById("search-input");
  const searchResults = document.getElementById("search-results");

  if (searchInput) {
    let searchTimeout;

    searchInput.addEventListener("input", function () {
      clearTimeout(searchTimeout);
      const query = this.value.trim();

      if (query.length > 2) {
        searchTimeout = setTimeout(() => {
          performSearch(query);
        }, 300);
      } else {
        if (searchResults) {
          searchResults.innerHTML = "";
          searchResults.classList.add("hidden");
        }
      }
    });
  }
}

function performSearch(query) {
  // Mock search results - in a real application, this would call an API
  const mockResults = [
    {
      title: "Baga Beach",
      type: "Beach",
      description: "Popular beach with water sports",
    },
    {
      title: "Old Goa Churches",
      type: "Heritage",
      description: "UNESCO World Heritage sites",
    },
    {
      title: "Goa Carnival",
      type: "Culture",
      description: "Annual cultural festival",
    },
    {
      title: "Dudhsagar Falls",
      type: "Nature",
      description: "Spectacular waterfall",
    },
  ];

  const filteredResults = mockResults.filter(
    (result) =>
      result.title.toLowerCase().includes(query.toLowerCase()) ||
      result.description.toLowerCase().includes(query.toLowerCase()),
  );

  displaySearchResults(filteredResults);
}

function displaySearchResults(results) {
  const searchResults = document.getElementById("search-results");

  if (!searchResults) return;

  if (results.length === 0) {
    searchResults.innerHTML =
      '<div class="p-4 text-gray-500">No results found</div>';
  } else {
    const resultsHTML = results
      .map(
        (result) => `
            <div class="p-4 hover:bg-gray-50 cursor-pointer border-b">
                <h4 class="font-semibold text-gray-800">${result.title}</h4>
                <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">${result.type}</span>
                <p class="text-sm text-gray-600 mt-1">${result.description}</p>
            </div>
        `,
      )
      .join("");

    searchResults.innerHTML = resultsHTML;
  }

  searchResults.classList.remove("hidden");
}

// Initialize search when page loads
document.addEventListener("DOMContentLoaded", initSearch);

// Cookie Consent (GDPR compliance)
function showCookieConsent() {
  if (!localStorage.getItem("cookieConsent")) {
    const consentBanner = document.createElement("div");
    consentBanner.className =
      "fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 z-50";
    consentBanner.innerHTML = `
            <div class="container mx-auto flex flex-col md:flex-row items-center justify-between">
                <p class="text-sm mb-4 md:mb-0">
                    We use cookies to enhance your browsing experience and provide personalized content.
                </p>
                <div class="flex space-x-4">
                    <button onclick="acceptCookies()" class="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-sm">
                        Accept
                    </button>
                    <button onclick="declineCookies()" class="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-sm">
                        Decline
                    </button>
                </div>
            </div>
        `;

    document.body.appendChild(consentBanner);
  }
}

function acceptCookies() {
  localStorage.setItem("cookieConsent", "accepted");
  removeCookieBanner();
}

function declineCookies() {
  localStorage.setItem("cookieConsent", "declined");
  removeCookieBanner();
}

function removeCookieBanner() {
  const banner = document.querySelector(".fixed.bottom-0");
  if (banner) {
    banner.remove();
  }
}

// Show cookie consent on page load
document.addEventListener("DOMContentLoaded", showCookieConsent);

// Performance Optimization - Lazy load videos
document.addEventListener("DOMContentLoaded", function () {
  const videos = document.querySelectorAll("video[data-src]");

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const video = entry.target;
        video.src = video.dataset.src;
        video.load();
        videoObserver.unobserve(video);
      }
    });
  });

  videos.forEach((video) => videoObserver.observe(video));
});

// Error Handling for Missing Resources
window.addEventListener("error", function (e) {
  if (e.target.tagName === "IMG") {
    e.target.src =
      "https://via.placeholder.com/400x300/cccccc/666666?text=Image+Not+Found";
  } else if (e.target.tagName === "VIDEO") {
    e.target.poster =
      "https://via.placeholder.com/800x450/cccccc/666666?text=Video+Not+Available";
  }
});

console.log("Goa Tourwala website loaded successfully!");
