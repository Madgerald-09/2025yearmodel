document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const video1 = document.getElementById("awardVideo1");
  const video2 = document.getElementById("awardVideo2");
  const video3 = document.getElementById("awardVideo3");
  const video5 = document.getElementById("awardVideo5");
  
  const videoPlaceholder1 = document.getElementById("videoPlaceholder1");
  const videoPlaceholder2 = document.getElementById("videoPlaceholder2");
  const videoPlaceholder3 = document.getElementById("videoPlaceholder3");
  const videoPlaceholder5 = document.getElementById("videoPlaceholder5");
  
  const videoOverlayBtn1 = document.getElementById("videoOverlayBtn1");
  const videoOverlayBtn2 = document.getElementById("videoOverlayBtn2");
  const videoOverlayBtn3 = document.getElementById("videoOverlayBtn3");
  const videoOverlayBtn5 = document.getElementById("videoOverlayBtn5");
  
  const videoContainer1 = document.querySelector(".video-container");
  const videoContainer2 = document.querySelector(".thank-you-video-container");
  const videoContainer3 = document.querySelector(".contact-video-container");
  const videoContainer5 = document.querySelector(".vid-five-video-container");
  
  const dmButton = document.getElementById("dmButton");
  const whatsappMessageButton = document.getElementById("whatsappMessageButton");
  const schoolImageContainer = document.getElementById("schoolImageContainer");
  const thankYouSection = document.querySelector(".thank-you-section");
  const contactSection = document.querySelector(".contact-section");
  const vidFiveSection = document.querySelector(".vid-five-section");
  const bmLink = document.querySelector(".bm-link");

  // URLs
  const INSTAGRAM_URL = "https://instagram.com/modelaward";
  const WHATSAPP_URL = "https://wa.me/2347077027579?text=Hello%20I'm%20interested%20in%20your%20services";

  // Check if mobile device
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const isSmallScreen = window.innerWidth <= 768;

  // Initialize all videos
  function initVideos() {
    const videos = [
      { 
        element: video1, 
        placeholder: videoPlaceholder1, 
        overlayBtn: videoOverlayBtn1, 
        container: videoContainer1,
        sources: [
          { src: "videos/award-video1.mp4", type: "video/mp4" }, // FIXED: Added missing quote
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
        sources: [] // Empty array for video 3
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
      if (videoData.sources.length > 0) {
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
      }

      // Set video attributes
      videoData.element.playsInline = true;
      videoData.element.muted = isMobile;
      videoData.element.preload = "metadata";
      videoData.element.controls = true;

      // Video event listeners
      videoData.element.addEventListener("loadeddata", function () {
        if (videoData.placeholder) {
          videoData.placeholder.style.display = "none";
        }
      });

      videoData.element.addEventListener("error", function () {
        if (videoData.placeholder) {
          if (index === 2) {
            // For video 3, show placeholder since video is not available
            videoData.placeholder.style.display = "flex";
            videoData.placeholder.querySelector("h3").textContent = "Video Coming Soon";
            videoData.placeholder.querySelector("p").textContent = "Check back later for our contact video";
          } else {
            videoData.placeholder.style.display = "flex";
            videoData.placeholder.querySelector("h3").textContent = "Video Unavailable";
            videoData.placeholder.querySelector("p").textContent = "Please check back later";
            const icon = videoData.placeholder.querySelector("i");
            if (icon) icon.className = "fas fa-exclamation-triangle";
          }
        }
      });

      // Click placeholder to play (skip video 3)
      if (videoData.placeholder && index !== 2) {
        videoData.placeholder.addEventListener("click", function () {
          playVideo(videoData.element, videoData.placeholder);
        });
        
        videoData.placeholder.addEventListener("touchend", function (e) {
          e.preventDefault();
          playVideo(videoData.element, videoData.placeholder);
        }, { passive: false });
      }

      // Click container to play/pause (desktop only)
      if (videoData.container && !isSmallScreen && index !== 2) {
        videoData.container.addEventListener("click", function (e) {
          if (e.target === videoData.container || e.target === videoData.placeholder) {
            toggleVideoPlayback(videoData.element, videoData.placeholder);
          }
        });
      }

      // Enable sound button (skip video 3)
      if (videoData.overlayBtn && index !== 2) {
        videoData.overlayBtn.addEventListener("click", function () {
          enableSound(videoData.element);
        });
        
        if (isMobile) {
          videoData.overlayBtn.style.display = "none";
        }
      }
    });
  }

  // Play video function
  function playVideo(videoElement, placeholder) {
    if (!videoElement) return;
    
    if (isMobile) {
      videoElement.muted = false;
    }
    
    videoElement.play()
      .then(() => {
        if (placeholder) placeholder.style.display = "none";
      })
      .catch(error => {
        console.error("Video playback failed:", error);
        if (isMobile) {
          videoElement.muted = true;
          videoElement.play().catch(e => {
            showNotification("Tap the video to play");
          });
        }
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
        showNotification("Sound enabled");
      })
      .catch(error => {
        console.error("Failed to play with sound:", error);
        showNotification("Tap the video to enable sound");
      });
  }

  // Load portfolio image
  function loadPortfolioImage() {
    if (!schoolImageContainer) return;
    
    const portfolioImages = [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop", // Placeholder
      "images/portfolio-showcase.jpg", // Fallback
    ];

    const placeholder = schoolImageContainer.querySelector('.placeholder-text');

    // Try loading placeholder image
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
        placeholder.style.fontSize = isSmallScreen ? '1rem' : '1.2rem';
      }
    };
    img.src = portfolioImages[0];
  }

  // Open Instagram DM
  function openInstagramDM() {
    let instagramURL = INSTAGRAM_URL;

    if (isMobile) {
      instagramURL = "instagram://user?username=modelaward";
    }

    if (isMobile) {
      window.location.href = instagramURL;
      setTimeout(() => {
        window.open(INSTAGRAM_URL, '_blank');
      }, 500);
    } else {
      window.open(instagramURL, '_blank');
    }
  }

  // Open WhatsApp Message
function openWhatsAppMessage() {
    // Use the standard WhatsApp API URL (works on both desktop and mobile)
    const whatsappURL = "https://api.whatsapp.com/send?phone=2347077027579&text=Hello!%20I%20would%20like%20to%20inquire%20about%20your%20services.";
    // Show confirmation
    showNotification('Opening WhatsApp...');
}

    if (isMobile) {
      window.location.href = whatsappURL;
      setTimeout(() => {
        window.open(WHATSAPP_URL, '_blank');
      }, 500);
    } else {
      window.open(whatsappURL, '_blank');
    }
  }

  // BM Link functionality
  function setupBMLink() {
    if (bmLink) {
      bmLink.addEventListener('click', function () {
        showNotification('BM link clicked! Add your functionality here.');
        
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
          this.style.transform = 'scale(1)';
        }, 200);
      });
      
      if (isMobile) {
        bmLink.addEventListener('touchstart', function() {
          this.style.opacity = '0.8';
        });
        
        bmLink.addEventListener('touchend', function() {
          this.style.opacity = '1';
        });
      }
    }
  }

  // Initialize sections with scroll detection
  function initScrollAnimations() {
    const sections = [
      { element: thankYouSection, threshold: 0.2 },
      { element: contactSection, threshold: 0.2 },
      { element: vidFiveSection, threshold: 0.2 }
    ];

    sections.forEach(sectionData => {
      if (!sectionData.element) return;

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            if (entry.target === vidFiveSection) {
              animateVidFiveText();
            }
            
            observer.disconnect();
          }
        });
      }, {
        threshold: sectionData.threshold,
        rootMargin: '50px'
      });

      observer.observe(sectionData.element);
    });
  }

  // Animate Vid Five text
  function animateVidFiveText() {
    const title = document.querySelector('.vid-five-title');
    const line1 = document.querySelector('.vid-five-line1');
    const line2 = document.querySelector('.vid-five-line2');
    const line3 = document.querySelector('.vid-five-line3');
    
    if (title) {
      title.style.animation = 'fadeInUp 0.8s ease-out 0.3s forwards';
    }
    if (line1) {
      line1.style.animation = 'fadeInUp 0.8s ease-out 0.5s forwards';
    }
    if (line2) {
      line2.style.animation = 'fadeInUp 0.8s ease-out 0.7s forwards';
    }
    if (line3) {
      line3.style.animation = 'fadeInUp 0.8s ease-out 0.9s forwards';
    }
  }

  // Show notification
  function showNotification(message) {
    let notification = document.querySelector('.notification');
    if (!notification) {
      notification = document.createElement('div');
      notification.className = 'notification';
      document.body.appendChild(notification);
    }
    
    notification.innerHTML = `<p>${message}</p>`;
    notification.style.display = 'block';
    notification.style.opacity = '1';
    
    setTimeout(() => {
      notification.style.opacity = '0';
      setTimeout(() => {
        notification.style.display = 'none';
      }, 500);
    }, 3000);
  }

  // Optimize for mobile
  function optimizeForMobile() {
    if (!isMobile) return;
    
    document.querySelectorAll('button, .bm-link, .back-btn').forEach(element => {
      element.style.cursor = 'pointer';
      element.style.minHeight = '44px';
      element.style.minWidth = '44px';
      element.style.display = 'flex';
      element.style.alignItems = 'center';
      element.style.justifyContent = 'center';
    });
    
    document.querySelectorAll('.service-item').forEach(item => {
      item.style.cursor = 'pointer';
      item.style.minHeight = '120px';
    });
    
    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 768px) {
        button, .bm-link, .back-btn, .service-item {
          -webkit-tap-highlight-color: rgba(212, 185, 150, 0.3);
        }
        
        video {
          touch-action: manipulation;
        }
        
        .video-container, .thank-you-video-container, .contact-video-container, .vid-five-video-container {
          touch-action: pan-y pinch-zoom;
        }
        
        .vid-five-message p {
          margin: 0 !important;
          padding: 0 !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize everything
  function initialize() {
    initVideos();
    loadPortfolioImage();
    initScrollAnimations();
    setupBMLink();

    if (dmButton) {
      dmButton.addEventListener("click", openInstagramDM);
      if (isMobile) {
        dmButton.addEventListener("touchend", (e) => {
          e.preventDefault();
          openInstagramDM();
        }, { passive: false });
      }
    }

    if (whatsappMessageButton) {
      whatsappMessageButton.addEventListener("click", openWhatsAppMessage);
      if (isMobile) {
        whatsappMessageButton.addEventListener("touchend", (e) => {
          e.preventDefault();
          openWhatsAppMessage();
        }, { passive: false });
      }
    }

    optimizeForMobile();
    setInterval(loadPortfolioImage, 60000);
    
    // REMOVED: initTextAnimations(); - Function doesn't exist
  }

  // Start initialization
  initialize();

  // Add hover effects only for desktop
  if (!isSmallScreen) {
    document.querySelectorAll('.service-item').forEach(item => {
      item.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px)';
        const icon = this.querySelector('i');
        if (icon) {
          icon.style.transform = 'scale(1.1)';
          icon.style.color = '#ffffff';
        }
      });

      item.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0)';
        const icon = this.querySelector('i');
        if (icon) {
          icon.style.transform = 'scale(1)';
          icon.style.color = '#d4b996';
        }
      });
    });
  }

  // Handle orientation change
  window.addEventListener('orientationchange', function() {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 100);
  });
  
  // Prevent zoom on double tap for mobile
  let lastTouchEnd = 0;
  document.addEventListener('touchend', function(event) {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);
  
  // Prevent pull-to-refresh on mobile
  document.addEventListener('touchmove', function(e) {
    if (e.touches.length > 1) {
      e.preventDefault();
    }
  }, { passive: false });
});