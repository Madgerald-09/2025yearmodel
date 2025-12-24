document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const video1 = document.getElementById("awardVideo");
  const video2 = document.getElementById("awardVideo2");
  const video5 = document.getElementById("awardVideo5");
  
  const videoPlaceholder1 = document.getElementById("videoPlaceholder");
  const videoPlaceholder2 = document.getElementById("videoPlaceholder2");
  const videoPlaceholder5 = document.getElementById("videoPlaceholder5");
  
  const videoOverlayBtn1 = document.getElementById("videoOverlayBtn");
  const videoOverlayBtn2 = document.getElementById("videoOverlayBtn2");
  const videoOverlayBtn5 = document.getElementById("videoOverlayBtn5");
  
  const videoContainer1 = document.querySelector(".video-container");
  const videoContainer2 = document.querySelector(".vid-two-video-container");
  const videoContainer5 = document.querySelector(".vid-five-video-container");
  
  const dmButton = document.getElementById("dmButton");
  const schoolImageContainer = document.getElementById("schoolImageContainer");
  const notification = document.getElementById("notification");

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
        element: video5, 
        placeholder: videoPlaceholder5, 
        overlayBtn: videoOverlayBtn5, 
        container: videoContainer5,
        sources: [
          { src: "videos/video5.mp4", type: "video/mp4" },
          { src: "videos/video5.webm", type: "video/webm" }
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
        if (videoData.placeholder) {
          videoData.placeholder.style.display = "none";
          // Show video controls
          videoData.element.controls = true;
        }
      });

      videoData.element.addEventListener("error", function () {
        if (videoData.placeholder) {
          videoData.placeholder.style.display = "flex";
          videoData.placeholder.querySelector("h3").textContent = "Video Unavailable";
          videoData.placeholder.querySelector("p").textContent = "Please check back later";
          videoData.placeholder.querySelector("i").className = "fas fa-exclamation-triangle";
        }
      });

      // Click placeholder to play
      if (videoData.placeholder) {
        videoData.placeholder.addEventListener("click", function () {
          playVideo(videoData.element, videoData.placeholder);
        });
      }

      // Click container to play/pause
      if (videoData.container) {
        videoData.container.addEventListener("click", function (e) {
          if (e.target === videoData.container || e.target === videoData.placeholder) {
            toggleVideoPlayback(videoData.element, videoData.placeholder);
          }
        });
      }

      // Enable sound button
      if (videoData.overlayBtn) {
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
        showNotification("Click the play button to start video");
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
      .then(() => {
        showNotification("Sound enabled for video");
      })
      .catch(error => {
        console.error("Failed to play with sound:", error);
        showNotification("Please interact with the page first to enable sound");
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
        placeholder.textContent = 'PORTFOLIO IMAGES COMING SOON';
        placeholder.style.color = 'rgba(212, 185, 150, 0.2)';
      }
    };
    img.src = portfolioImages[0];
  }

  // Open Instagram DM
  function openInstagramDM() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    let instagramURL = INSTAGRAM_URL;

    if (isMobile) {
      instagramURL = "instagram://user?username=modelaward";
    }

    window.open(instagramURL, '_blank');
  }

  // Show notification
  function showNotification(message) {
    if (!notification) return;
    notification.innerHTML = `<p>${message}</p>`;
    notification.classList.add('show');
    
    setTimeout(() => {
      notification.classList.remove('show');
    }, 3000);
  }

  // Initialize sections with scroll animation
  function initScrollAnimations() {
    const sections = document.querySelectorAll('.vid-two-section, .vid-five-section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '50px'
    });

    sections.forEach(section => {
      section.style.opacity = "0";
      section.style.transform = "translateY(50px)";
      section.style.transition = "all 1s ease-out";
      observer.observe(section);
    });
  }

  // Initialize everything
  function initialize() {
    // Initialize videos
    initVideos();

    // Load portfolio images
    loadPortfolioImage();

    // Initialize scroll animations
    initScrollAnimations();

    // Event listeners
    if (dmButton) {
      dmButton.addEventListener("click", openInstagramDM);
    }

    // Show welcome notification
    setTimeout(() => {
      showNotification("Welcome to Model Of The Year Award Services!");
    }, 1000);

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

  // Add click effect to gallery items
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', function() {
      this.style.animation = 'none';
      setTimeout(() => {
        this.style.animation = '';
      }, 10);
    });
  });

  // Auto-play first video when it's in viewport
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && video1 && video1.paused) {
        // Auto-play only the first video when it's 50% visible
        if (entry.intersectionRatio >= 0.5) {
          video1.play().catch(() => {
            // Autoplay was prevented
            console.log("Autoplay prevented by browser");
          });
        }
      }
    });
  }, {
    threshold: [0.5]
  });

  if (videoContainer1) {
    videoObserver.observe(videoContainer1);
  }
});