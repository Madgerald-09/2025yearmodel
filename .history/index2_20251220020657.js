document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const videoElement = document.getElementById("awardVideo");
  const videoPlaceholder = document.getElementById("videoPlaceholder");
  const videoContainer = document.querySelector(".video-container");
  const videoOverlay = document.getElementById("videoOverlay");
  const overlayBtn = document.getElementById("videoOverlayBtn");
  const dmButton = document.getElementById("dmButton");
  const notification = document.getElementById("notification");
  const schoolImageContainer = document.getElementById("schoolImageContainer");
  const vidTwoSection = document.querySelector(".vid-two-section");

  // Instagram URL
  const INSTAGRAM_URL = "https://instagram.com/modelaward";

  // Show notification
  function showNotification(message, duration = 3000) {
    notification.querySelector("p").textContent = message;
    notification.classList.add("show");
    setTimeout(() => {
      notification.classList.remove("show");
    }, duration);
  }

  // Initialize video
  function initVideo() {
    if (!videoElement) return;

    // Create video source alternatives
    const videoSources = [
      { src: "videos/award-video1.mp4", type: "video/mp4" },
      { src: "videos/award-video1.webm", type: "video/webm" }
    ];

    // Clear existing sources
    videoElement.innerHTML = "";

    // Add sources
    videoSources.forEach(source => {
      const sourceElement = document.createElement("source");
      sourceElement.src = source.src;
      sourceElement.type = source.type;
      videoElement.appendChild(sourceElement);
    });

    // Add fallback text
    const fallbackText = document.createElement("p");
    fallbackText.textContent = "Your browser does not support the video element.";
    videoElement.appendChild(fallbackText);

    // Set video attributes
    videoElement.playsInline = true;
    videoElement.muted = true;
    videoElement.preload = "metadata";

    // Video event listeners
    videoElement.addEventListener("loadeddata", function () {
      videoPlaceholder.style.display = "none";
      showNotification("Video loaded successfully!");
    });

    videoElement.addEventListener("error", function () {
      videoPlaceholder.querySelector("p").textContent = "Video unavailable. Please check back later.";
      videoPlaceholder.querySelector("i").className = "fas fa-exclamation-triangle";
      showNotification("Unable to load video. Please try again later.", 5000);
    });

    videoElement.addEventListener("play", function () {
      videoOverlay.classList.add("hidden");
    });

    // Click placeholder to play
    videoPlaceholder.addEventListener("click", function () {
      playVideo();
    });

    // Click container to play/pause
    videoContainer.addEventListener("click", function (e) {
      if (e.target === videoContainer || e.target === videoPlaceholder) {
        toggleVideoPlayback();
      }
    });
  }

  // Play video function
  function playVideo() {
    videoElement.play()
      .then(() => {
        videoPlaceholder.style.display = "none";
        videoOverlay.classList.add("hidden");
      })
      .catch(error => {
        console.error("Video playback failed:", error);
        showNotification("Click the video to play", 2000);
      });
  }

  // Toggle video playback
  function toggleVideoPlayback() {
    if (videoElement.paused) {
      playVideo();
    } else {
      videoElement.pause();
    }
  }

  // Enable sound and play
  function enableSound() {
    videoElement.muted = false;
    videoElement.play()
      .then(() => {
        videoOverlay.classList.add("hidden");
        showNotification("Sound enabled 🔊");
      })
      .catch(error => {
        console.error("Failed to play with sound:", error);
        showNotification("Please interact with the page to enable sound", 3000);
      });
  }

  // Load portfolio image
  function loadPortfolioImage() {
    const portfolioImages = [
      "images/portfolio-showcase.jpg",
      "images/portfolio-1.jpg",
      "images/portfolio-2.jpg",
      "images/portfolio-3.jpg"
    ];

    const placeholder = schoolImageContainer.querySelector('.placeholder-text');

    // Try loading images
    portfolioImages.forEach((imgSrc, index) => {
      const img = new Image();
      img.onload = function () {
        if (index === 0) {
          schoolImageContainer.style.backgroundImage =
            `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${imgSrc}')`;
          schoolImageContainer.classList.add('loaded');
          if (placeholder) placeholder.style.display = 'none';
        }
        // Update gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        if (galleryItems[index]) {
          galleryItems[index].style.backgroundImage = `url('${imgSrc}')`;
          galleryItems[index].style.backgroundSize = 'cover';
          galleryItems[index].style.backgroundPosition = 'center';
        }
      };
      img.onerror = function () {
        if (index === 0 && placeholder) {
          placeholder.textContent = 'PORTFOLIO IMAGES';
          placeholder.style.color = 'rgba(212, 185, 150, 0.2)';
        }
      };
      img.src = imgSrc;
    });
  }

  // Open Instagram DM
  function openInstagramDM() {
    // Try to open Instagram app or web
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    let instagramURL = INSTAGRAM_URL;

    if (isMobile) {
      instagramURL = "instagram://user?username=modelaward";
    }

    // Open in new tab
    window.open(instagramURL, '_blank');
    showNotification("📩 Opening Instagram...", 2000);
  }

  // Initialize Vid Two section with scroll detection
  function initVidTwoSection() {
    if (!vidTwoSection) return;

    // Create Intersection Observer for scroll detection
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class for animation
          vidTwoSection.classList.add('visible');

          // Show notification
          setTimeout(() => {
            showNotification("A special thank you message! 🏆", 4000);
          }, 500);

          // Observer can be disconnected after first trigger
          observer.disconnect();
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '50px'
    });

    // Start observing
    observer.observe(vidTwoSection);

    // Add interactive effects
    const youlliText = document.querySelector('.line3');
    if (youlliText) {
      youlliText.addEventListener('mouseenter', function () {
        this.style.transform = 'scale(1.05)';
        this.style.textShadow = '0 0 50px rgba(212, 185, 150, 0.8)';
        this.style.borderColor = '#d4b996';
      });

      youlliText.addEventListener('mouseleave', function () {
        this.style.transform = 'scale(1)';
        this.style.textShadow = '0 0 30px rgba(255, 255, 255, 0.5)';
        this.style.borderColor = '#5d4c3a';
      });

      // Add click effect
      youlliText.addEventListener('click', function () {
        this.style.animation = 'none';
        setTimeout(() => {
          this.style.animation = 'fadeInUp 0.8s ease-out 0.8s forwards, glow 2s ease-in-out infinite alternate 1.6s';
        }, 10);
        showNotification("YOULLI! 🎉", 2000);
      });
    }

    // Add click effect to signature
    const signature = document.querySelector('.signature');
    if (signature) {
      signature.addEventListener('click', function () {
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 300);
        showNotification("/S<K", 2000);
      });
    }
  }

  // Initialize everything
  function initialize() {
    // Initialize video
    initVideo();

    // Load portfolio images
    loadPortfolioImage();

    // Initialize Vid Two section
    initVidTwoSection();

    // Event listeners
    if (overlayBtn) {
      overlayBtn.addEventListener("click", enableSound);
    }

    if (dmButton) {
      dmButton.addEventListener("click", openInstagramDM);
    }

    // Keyboard shortcuts
    document.addEventListener("keydown", function (e) {
      // Space to play/pause video (when not focused on input)
      if (e.code === "Space" && document.activeElement !== videoElement && !document.activeElement.matches('input, textarea, button')) {
        e.preventDefault();
        toggleVideoPlayback();
      }
      // M to mute/unmute video
      if (e.code === "KeyM" && !videoElement.paused) {
        videoElement.muted = !videoElement.muted;
        showNotification(videoElement.muted ? "Sound muted 🔇" : "Sound enabled 🔊");
      }
      // Arrow down to scroll to Vid Two section
      if (e.code === "ArrowDown" && vidTwoSection) {
        e.preventDefault();
        vidTwoSection.scrollIntoView({ behavior: 'smooth' });
      }
    });

    // Welcome notification
    setTimeout(() => {
      showNotification("Welcome to our Services Page! Scroll down for more 🏆", 4000);
    }, 1500);

    // Check image every 60 seconds
    setInterval(loadPortfolioImage, 60000);

    // Add scroll indicator animation
    let scrollTimeout;
    window.addEventListener('scroll', function () {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (window.scrollY > 300 && !vidTwoSection.classList.contains('visible')) {
          showNotification("↓ Keep scrolling ↓", 2000);
        }
      }, 500);
    });
  }

  // Start initialization
  initialize();

  // Add hover effects to service items
  document.querySelectorAll('.service-item').forEach(item => {
    item.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = 'scale(1.2)';
        icon.style.color = '#ffffff';
      }
    });

    item.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
      const icon = this.querySelector('i');
      if (icon) {
        icon.style.transform = 'scale(1)';
        icon.style.color = '#d4b996';
      }
    });
  });

  // Add click effect to gallery items
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function () {
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 200);
      showNotification("Viewing portfolio image", 2000);
    });
  });
});