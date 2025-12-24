document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const video1 = document.getElementById("awardVideo1");
  const video2 = document.getElementById("awardVideo2");
  const video3 = document.getElementById("awardVideo3");
  
  const videoPlaceholder1 = document.getElementById("videoPlaceholder1");
  const videoPlaceholder2 = document.getElementById("videoPlaceholder2");
  const videoPlaceholder3 = document.getElementById("videoPlaceholder3");
  
  const videoOverlayBtn1 = document.getElementById("videoOverlayBtn1");
  const videoOverlayBtn2 = document.getElementById("videoOverlayBtn2");
  const videoOverlayBtn3 = document.getElementById("videoOverlayBtn3");
  
  const videoContainer1 = document.querySelector(".video-container");
  const videoContainer2 = document.querySelector(".thank-you-video-container");
  const videoContainer3 = document.querySelector(".contact-video-container");
  
  const dmButton = document.getElementById("dmButton");
  const schoolImageContainer = document.getElementById("schoolImageContainer");
  const thankYouSection = document.querySelector(".thank-you-section");
  const contactSection = document.querySelector(".contact-section");

  // Instagram URL
  const INSTAGRAM_URL = "https://instagram.com/modelaward";

  // Initialize all videos
  function initVideos() {
    const videos = [
      { 
        element: video1, 
        placeholder: videoPlaceholder1, 
        overlayBtn: videoOverlayBtn1, 
        container: videoContainer1,
        sources: [
          { src: "videos/award-video1.mp4", type: "video/mp4" },
          { src: "videos/award-video1.webm", type: "video/webm" }
        ]
      },
      { 
        element: video2, 
        placeholder: videoPlaceholder2, 
        overlayBtn: videoOverlayBtn2, 
        container: videoContainer2,
        sources: [
          { src: "videos/thank-you-video.mp4", type: "video/mp4" },
          { src: "videos/thank-you-video.webm", type: "video/webm" }
        ]
      },
      { 
        element: video3, 
        placeholder: videoPlaceholder3, 
        overlayBtn: videoOverlayBtn3, 
        container: videoContainer3,
        sources: [
          { src: "", type: "video/mp4" }, // Empty for now
        ]
      }
    ];

    videos.forEach((videoData, index) => {
      if (!videoData.element) return;

      // Clear existing sources
      videoData.element.innerHTML = "";

      // Add sources if available
      videoData.sources.forEach(source => {
        if (source.src) {
          const sourceElement = document.createElement("source");
          sourceElement.src = source.src;
          sourceElement.type = source.type;
          videoData.element.appendChild(sourceElement);
        }
      });

      // Add fallback text
      const fallbackText = document.createElement("p");
      fallbackText.textContent = "Your browser does not support the video element.";
      videoData.element.appendChild(fallbackText);

      // Set video attributes
      videoData.element.playsInline = true;
      videoData.element.muted = true;
      videoData.element.preload = "metadata";

      // Video event listeners
      videoData.element.addEventListener("loadeddata", function () {
        if (videoData.placeholder) videoData.placeholder.style.display = "none";
      });

      videoData.element.addEventListener("error", function () {
        if (videoData.placeholder) {
          if (index === 2) {
            // For video 3 (contact video), show placeholder since video is not available yet
            videoData.placeholder.style.display = "flex";
            videoData.placeholder.querySelector("h3").textContent = "Video Coming Soon";
            videoData.placeholder.querySelector("p").textContent = "Check back later for our contact video";
          } else {
            videoData.placeholder.querySelector("p").textContent = "Video unavailable. Please check back later.";
            videoData.placeholder.querySelector("i").className = "fas fa-exclamation-triangle";
          }
        }
      });

      // Click placeholder to play (if video exists)
      if (videoData.placeholder) {
        videoData.placeholder.addEventListener("click", function () {
          if (index !== 2) { // Don't try to play video 3 yet
            playVideo(videoData.element, videoData.placeholder);
          }
        });
      }

      // Click container to play/pause
      if (videoData.container) {
        videoData.container.addEventListener("click", function (e) {
          if (e.target === videoData.container || e.target === videoData.placeholder) {
            if (index !== 2) { // Don't try to play video 3 yet
              toggleVideoPlayback(videoData.element, videoData.placeholder);
            }
          }
        });
      }

      // Enable sound button (only for videos that exist)
      if (videoData.overlayBtn && index !== 2) {
        videoData.overlayBtn.addEventListener("click", function () {
          enableSound(videoData.element);
        });
      }
    });
  }

  // Play video function
  function playVideo(videoElement, placeholder) {
    if (!videoElement) return;
    videoElement.play()
      .then(() => {
        if (placeholder) placeholder.style.display = "none";
      })
      .catch(error => {
        console.error("Video playback failed:", error);
      });
  }

  // Toggle video playback
  function toggleVideoPlayback(videoElement, placeholder) {
    if (!videoElement) return;
    if (videoElement.paused) {
      playVideo(videoElement, placeholder);
    } else {
      videoElement.pause();
    }
  }

  // Enable sound and play
  function enableSound(videoElement) {
    if (!videoElement) return;
    videoElement.muted = false;
    videoElement.play()
      .catch(error => {
        console.error("Failed to play with sound:", error);
      });
  }

  // Load portfolio image
  function loadPortfolioImage() {
    if (!schoolImageContainer) return;
    
    const portfolioImages = [
      "images/portfolio-showcase.jpg",
      "images/portfolio-1.jpg",
      "images/portfolio-2.jpg",
      "images/portfolio-3.jpg"
    ];

    const placeholder = schoolImageContainer.querySelector('.placeholder-text');

    // Try loading first image
    const img = new Image();
    img.onload = function () {
      schoolImageContainer.style.backgroundImage =
        `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${portfolioImages[0]}')`;
      schoolImageContainer.classList.add('loaded');
      if (placeholder) placeholder.style.display = 'none';
    };
    img.onerror = function () {
      if (placeholder) {
        placeholder.textContent = 'PORTFOLIO IMAGES';
        placeholder.style.color = 'rgba(212, 185, 150, 0.2)';
      }
    };
    img.src = portfolioImages[0];
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
  }

  // Initialize Thank You section with scroll detection
  function initThankYouSection() {
    if (!thankYouSection) return;

    // Create Intersection Observer for scroll detection
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class for animation
          thankYouSection.classList.add('visible');
          
          // Observer can be disconnected after first trigger
          observer.disconnect();
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '50px'
    });

    // Start observing
    observer.observe(thankYouSection);
  }

  // Initialize Contact section with scroll detection
  function initContactSection() {
    if (!contactSection) return;

    // Create Intersection Observer for scroll detection
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add visible class for animation
          contactSection.classList.add('visible');
          
          // Observer can be disconnected after first trigger
          observer.disconnect();
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '50px'
    });

    // Start observing
    observer.observe(contactSection);
  }

  // Initialize everything
  function initialize() {
    // Initialize videos
    initVideos();

    // Load portfolio images
    loadPortfolioImage();

    // Initialize sections with scroll detection
    initThankYouSection();
    initContactSection();

    // Event listeners
    if (dmButton) {
      dmButton.addEventListener("click", openInstagramDM);
    }

    // Add click effect to BM link
    const bmLink = document.querySelector('.bm-link');
    if (bmLink) {
      bmLink.addEventListener('click', function () {
        this.style.animation = 'none';
        setTimeout(() => {
          this.style.animation = '';
        }, 10);
      });
    }

    // Check image every 60 seconds
    setInterval(loadPortfolioImage, 60000);
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

  // Mobile touch optimizations
  document.querySelectorAll('video').forEach(video => {
    video.addEventListener('touchstart', function() {
      if (this.src) {
        this.play();
      }
    }, { passive: true });
  });
});