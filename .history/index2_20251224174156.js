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

  // URLs - SIMPLIFIED AND WORKING
  const INSTAGRAM_URL = "https://instagram.com/modelaward";
  const WHATSAPP_URL = "https://wa.me/2347077027579";

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
        container: videoContainer1
      },
      { 
        element: video2, 
        placeholder: videoPlaceholder2, 
        overlayBtn: videoOverlayBtn2, 
        container: videoContainer2
      },
      { 
        element: video3, 
        placeholder: videoPlaceholder3, 
        overlayBtn: videoOverlayBtn3, 
        container: videoContainer3
      },
      { 
        element: video5, 
        placeholder: videoPlaceholder5, 
        overlayBtn: videoOverlayBtn5, 
        container: videoContainer5
      }
    ];

    videos.forEach((videoData, index) => {
      if (!videoData.element) return;

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

  // Open Instagram DM - SIMPLE AND WORKING
  function openInstagramDM() {
    showNotification("Opening Instagram...");
    setTimeout(() => {
      window.open(INSTAGRAM_URL, '_blank');
    }, 500);
  }

  // Open WhatsApp Message - SIMPLE AND WORKING
  function openWhatsAppMessage() {
    showNotification("Opening WhatsApp...");
    setTimeout(() => {
      window.open(WHATSAPP_URL, '_blank');
    }, 500);
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
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(93, 76, 58, 0.95);
        color: #ffffff;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.5s ease;
        backdrop-filter: blur(10px);
        border: 2px solid rgba(212, 185, 150, 0.3);
        max-width: 300px;
        display: none;
      `;
      document.body.appendChild(notification);
    }
    
    notification.innerHTML = `<p style="margin: 0; font-size: 0.9rem; font-weight: 500; line-height: 1.4;">${message}</p>`;
    notification.style.display = 'block';
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
    
    setTimeout(() => {
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        notification.style.display = 'none';
      }, 500);
    }, 3000);
  }

  // Initialize everything
  function initialize() {
    initVideos();
    initScrollAnimations();

    // Instagram DM Button
    if (dmButton) {
      dmButton.addEventListener("click", openInstagramDM);
      dmButton.addEventListener("touchend", function(e) {
        e.preventDefault();
        openInstagramDM();
      }, { passive: false });
    }

    // WhatsApp Button - FIXED
    if (whatsappMessageButton) {
      whatsappMessageButton.addEventListener("click", openWhatsAppMessage);
      whatsappMessageButton.addEventListener("touchend", function(e) {
        e.preventDefault();
        openWhatsAppMessage();
      }, { passive: false });
    }
  }

  // Start initialization
  initialize();

  // Add enhanced hover effects for desktop
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
});