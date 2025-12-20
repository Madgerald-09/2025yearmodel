document.addEventListener("DOMContentLoaded", function () {
  // DOM Elements
  const imagePreview = document.getElementById("imagePreview");
  const schoolImageContainer = document.getElementById("schoolImageContainer");
  const watchShowBtn = document.getElementById("watchShowBtn");
  const dmButton = document.getElementById("dmButton");
  const notification = document.getElementById("notification");
  const hours24El = document.getElementById("hours24");
  const minutes60El = document.getElementById("minutes60");
  const seconds60El = document.getElementById("seconds60");
  const awardPage = document.getElementById("awardPage");
  const servicesPage = document.getElementById("servicesPage");

  // State to prevent moving on until first page is completed
  let firstPageCompleted = false;

  // 24-hour countdown timer
  let totalSeconds = 24 * 60 * 60; // 24 hours in seconds

  // Update countdown display
  function update24HourCountdown() {
    if (totalSeconds <= 0) {
      // Countdown finished
      hours24El.textContent = "00";
      minutes60El.textContent = "00";
      seconds60El.textContent = "00";
      return;
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    hours24El.textContent = hours.toString().padStart(2, "0");
    minutes60El.textContent = minutes.toString().padStart(2, "0");
    seconds60El.textContent = seconds.toString().padStart(2, "0");

    totalSeconds--;
  }

  // Load award image
  function loadAwardImage() {
    const img = document.createElement("img");
    img.id = "awardImage";
    img.alt = "Label Of The Year Award 2025";

    const imageUrl = "images/award-image1.png";

    const testImage = new Image();
    testImage.onload = function () {
      img.src = imageUrl;
      img.style.display = "block";

      const noImageMsg = imagePreview.querySelector(".no-image");
      if (noImageMsg) {
        noImageMsg.remove();
      }

      // Resize image for better mobile display
      if (window.innerWidth <= 768) {
        img.style.objectFit = "contain";
        img.style.maxHeight = "100%";
        img.style.maxWidth = "100%";
      }
    };

    testImage.onerror = function () {
      const noImageMsg = document.createElement("div");
      noImageMsg.className = "no-image";
      noImageMsg.innerHTML = `
                <i class="fas fa-image" style="font-size: 48px; margin-bottom: 15px; color: #5d4c3a;"></i>
                <p>Award Image</p>
                <p style="font-size: 12px; margin-top: 10px;">Place award-image.png in images folder</p>
            `;

      imagePreview.innerHTML = "";
      imagePreview.appendChild(noImageMsg);
    };

    testImage.src = imageUrl + "?" + new Date().getTime();

    imagePreview.innerHTML = "";
    imagePreview.appendChild(img);
  }

  // Load school image
  function loadSchoolImage() {
    const img = document.createElement("img");
    img.id = "schoolImage";
    img.alt = "School Image";

    const imageUrl = "images/school-image.png";

    const testImage = new Image();
    testImage.onload = function () {
      img.src = imageUrl;
      img.style.display = "block";

      const noImageMsg = schoolImageContainer.querySelector(".no-image");
      if (noImageMsg) {
        noImageMsg.remove();
      }

      // Resize image for better mobile display
      if (window.innerWidth <= 768) {
        img.style.objectFit = "contain";
        img.style.maxHeight = "100%";
        img.style.maxWidth = "100%";
      }
    };

    testImage.onerror = function () {
      const noImageMsg = document.createElement("div");
      noImageMsg.className = "no-image";
      noImageMsg.innerHTML = `
                <i class="fas fa-image" style="font-size: 48px; margin-bottom: 15px; color: #5d4c3a;"></i>
                <p>School Image</p>
                <p style="font-size: 12px; margin-top: 10px;">Place school-image.png in images folder</p>
            `;

      schoolImageContainer.innerHTML = "";
      schoolImageContainer.appendChild(noImageMsg);
    };

    testImage.src = imageUrl + "?" + new Date().getTime();

    schoolImageContainer.innerHTML = "";
    schoolImageContainer.appendChild(img);
  }

  // Watch show button — marking first page complete on click
  watchShowBtn.addEventListener("click", function () {
    showNotification(
      "The show will begin in 24 hours on December 31, 2025 at 8:00 PM EST"
    );

    // Mark the first page as completed so user can proceed
    firstPageCompleted = true;
    this.classList.add("completed");
    this.disabled = true;
    this.textContent = "Done — You may continue";

    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 150);
  });

  // DM button
  dmButton.addEventListener("click", function () {
    showNotification("Contact us on Instagram @labelaward for our services");

    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 150);
  });

  // Show notification
  function showNotification(message) {
    notification.querySelector("p").textContent = message;
    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }

  // Smooth scroll transitions between pages - IMPROVED VERSION
  let isScrolling = false;
  let currentPage = 0; // 0 = award page, 1 = services page
  let scrollTimeout;

  // Improved scroll handler with debouncing and first-page check
  function handleScroll(e) {
    if (isScrolling) return;

    if (scrollTimeout) clearTimeout(scrollTimeout);

    const delta = e.deltaY || (e.wheelDelta ? -e.wheelDelta : 0);
    const threshold = window.innerWidth <= 768 ? 20 : 5;

    if (Math.abs(delta) > threshold) {
      isScrolling = true;

      if (delta > 0 && currentPage === 0) {
        goToServicesPage();
      } else if (delta < 0 && currentPage === 1) {
        goToAwardPage();
      } else {
        isScrolling = false;
        return;
      }

      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 1000);
    }
  }

  // Improved touch events for mobile
  let touchStartY = 0;
  let touchStartTime = 0;
  const MIN_SWIPE_DISTANCE = 40; // Reduced for better mobile sensitivity
  const MAX_SWIPE_TIME = 800; // Increased timeout for better UX

  function handleTouchStart(e) {
    touchStartY = e.touches[0].clientY;
    touchStartTime = Date.now();
  }

  function handleTouchEnd(e) {
    if (isScrolling) return;

    const touchEndY = e.changedTouches[0].clientY;
    const touchEndTime = Date.now();
    const deltaY = touchEndY - touchStartY;
    const elapsedTime = touchEndTime - touchStartTime;

    // Only register as swipe if it's quick enough and far enough
    if (Math.abs(deltaY) > MIN_SWIPE_DISTANCE && elapsedTime < MAX_SWIPE_TIME) {
      isScrolling = true;

      if (deltaY < 0 && currentPage === 0) {
        // Swipe up (scrolling down) from award page to services page
        goToServicesPage();
      } else if (deltaY > 0 && currentPage === 1) {
        // Swipe down (scrolling up) from services page to award page
        goToAwardPage();
      }

      setTimeout(() => {
        isScrolling = false;
      }, 1000);
    }
  }

  // Keyboard navigation
  function handleKeyDown(e) {
    if (isScrolling) return;

    if (e.key === "ArrowDown" && currentPage === 0) {
      // Arrow down from award page to services page
      e.preventDefault();
      if (!firstPageCompleted) {
        showNotification("Finish the first page (click 'Watch Show') to continue");
        return;
      }

      goToServicesPage();
    } else if (e.key === "ArrowUp" && currentPage === 1) {
      // Arrow up from services page to award page
      e.preventDefault();
      goToAwardPage();
    } else if (e.key === " " || e.key === "Spacebar") {
      // Spacebar toggles between pages
      e.preventDefault();

      if (currentPage === 0) {
        goToServicesPage();
      } else {
        goToAwardPage();
      }
    }
  }

  // Add click/tap event for scroll indicators
  function setupScrollIndicators() {
    const scrollIndicators = document.querySelectorAll(".scroll-indicator");

    scrollIndicators.forEach((indicator) => {
      indicator.style.cursor = "pointer";
      indicator.addEventListener("click", function () {
        if (isScrolling) return;

        isScrolling = true;

        if (currentPage === 0) {
          // Clicking "scroll up for services" when on award page
          goToServicesPage();
        } else {
          // Clicking "scroll down for award page" when on services page
          goToAwardPage();
        }

        setTimeout(() => {
          isScrolling = false;
        }, 800);
      });
    });
  }

  // Handle window resize for better mobile experience
  function handleResize() {
    // Adjust image display on resize
    loadAwardImage();
    loadSchoolImage();

    // Adjust scroll sensitivity based on screen size
    if (window.innerWidth <= 768) {
      // Enable touch scrolling within pages on mobile
      document.body.style.overflowY = "hidden";
      awardPage.style.overflowY = "auto";
      servicesPage.style.overflowY = "auto";
    } else {
      document.body.style.overflowY = "hidden";
      awardPage.style.overflowY = "auto";
      servicesPage.style.overflowY = "auto";
    }
  }

  // Navigation helpers
  function goToServicesPage() {
    if (!firstPageCompleted) {
      showNotification("Finish the first page (click 'Watch Show') to continue");
      return;
    }
    isScrolling = true;
    currentPage = 1;
    awardPage.style.transform = "translateY(-100vh)";
    servicesPage.style.transform = "translateY(0)";
    showNotification("Services Page");
    enterServicesPage();
    setTimeout(() => {
      isScrolling = false;
    }, 800);
  }

  function goToAwardPage() {
    isScrolling = true;
    currentPage = 0;
    awardPage.style.transform = "translateY(0)";
    servicesPage.style.transform = "translateY(100vh)";
    showNotification("Award Page");
    leaveServicesPage();
    setTimeout(() => {
      isScrolling = false;
    }, 800);
  }

  // Load video function with unmuted-autoplay attempt and overlay fallback
  function loadVideo() {
    const videoElement = document.getElementById("awardVideo");
    const videoPlaceholder = document.getElementById("videoPlaceholder");
    const videoOverlay = document.getElementById("videoOverlay");
    const overlayBtn = document.getElementById("videoOverlayBtn");
    const videoUrl = "videos/award-video1.mp4";

    console.log("Checking video at:", videoUrl);

    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", videoUrl, true);

    xhr.onload = function () {
      if (xhr.status === 200) {
        let source = videoElement.querySelector("source");
        if (!source) {
          source = document.createElement("source");
          source.type = "video/mp4";
          videoElement.appendChild(source);
        }
        source.src = videoUrl;
        videoElement.load();

        // First attempt: try unmuted autoplay (likely to be blocked by most browsers)
        videoElement.muted = false;
        const tryPlay = videoElement.play();

        if (tryPlay !== undefined) {
          tryPlay
            .then(() => {
              // Unmuted autoplay succeeded (rare but possible)
              videoElement.classList.add("show-video");
              videoPlaceholder.classList.add("hide-placeholder");
              if (videoOverlay) videoOverlay.classList.add("hidden");
              showNotification("Video playing with sound");
            })
            .catch((err) => {
              // Unmuted autoplay blocked — fallback to muted autoplay to at least show video
              console.warn("Unmuted autoplay blocked:", err);

              videoElement.muted = true;
              videoElement.play()
                .then(() => {
                  videoElement.classList.add("show-video");
                  videoPlaceholder.classList.add("hide-placeholder");

                  // Show overlay to allow user to enable sound (unmute on gesture)
                  if (videoOverlay) videoOverlay.classList.remove("hidden");
                  if (overlayBtn) {
                    overlayBtn.addEventListener(
                      "click",
                      function () {
                        videoElement.muted = false;
                        videoElement
                          .play()
                          .then(() => {
                            if (videoOverlay) videoOverlay.classList.add("hidden");
                            showNotification("Sound enabled");
                          })
                          .catch((playErr) => {
                            console.error("Failed to play after unmute:", playErr);
                          });
                      },
                      { once: true }
                    );
                  }
                })
                .catch((mutedErr) => {
                  // Even muted autoplay blocked — show click-to-play
                  console.warn("Muted autoplay blocked:", mutedErr);
                  videoPlaceholder.querySelector("p").textContent = "Click to play the video";
                  if (videoOverlay) {
                    videoOverlay.classList.remove("hidden");
                    if (overlayBtn) overlayBtn.textContent = "Play video";
                    if (overlayBtn) {
                      overlayBtn.addEventListener(
                        "click",
                        function () {
                          videoElement.muted = false;
                          videoElement
                            .play()
                            .then(() => {
                              videoPlaceholder.classList.add("hide-placeholder");
                              videoElement.classList.add("show-video");
                              if (videoOverlay) videoOverlay.classList.add("hidden");
                              showNotification("Video playing");
                            })
                            .catch((playErr2) => {
                              console.error("Play after user click failed:", playErr2);
                              videoPlaceholder.querySelector("p").textContent = "Unable to play video";
                            });
                        },
                        { once: true }
                      );
                    }
                  }
                });
            });
        } else {
          // Older browsers: show video UI
          videoElement.classList.add("show-video");
          videoPlaceholder.classList.add("hide-placeholder");
        }

        videoElement.addEventListener("error", function (e) {
          console.error("Video error:", e);
          videoPlaceholder.querySelector("p").textContent = "Error playing video";
          videoElement.classList.remove("show-video");
          videoPlaceholder.classList.remove("hide-placeholder");
        });
      } else {
        console.warn("Video not found (status ", xhr.status, "):", videoUrl);
        videoPlaceholder.querySelector("p").textContent = "Video not found: " + videoUrl;
        showNotification("Add award-video1.mp4 to videos folder");
        videoElement.classList.remove("show-video");
        videoPlaceholder.classList.remove("hide-placeholder");
      }
    };

    xhr.onerror = function () {
      console.error("XHR error checking video");
      videoPlaceholder.querySelector("p").textContent = "Video file not found";
      showNotification("Place award-video1.mp4 in videos folder");
      videoElement.classList.remove("show-video");
      videoPlaceholder.classList.remove("hide-placeholder");
    };

    xhr.send();
  }

  // Called when the services page becomes visible
  function enterServicesPage() {
    // Ensure video source is set
    loadVideo();

    const v = document.getElementById("awardVideo");
    const placeholder = document.getElementById("videoPlaceholder");
    const overlay = document.getElementById("videoOverlay");

    if (!v) return;

    // Try to play muted so browsers allow autoplay; overlay lets user enable sound
    v.muted = true;
    v.play()
      .then(() => {
        v.classList.add("show-video");
        if (placeholder) placeholder.classList.add("hide-placeholder");
        if (overlay) overlay.classList.remove("hidden");
        showNotification("Video playing");

        // Attach overlay button to enable sound if present
        const overlayBtn = document.getElementById("videoOverlayBtn");
        if (overlay && overlayBtn) {
          overlayBtn.addEventListener(
            "click",
            function () {
              v.muted = false;
              v
                .play()
                .then(() => {
                  overlay.classList.add("hidden");
                  showNotification("Sound enabled");
                })
                .catch((playErr) => {
                  console.error("Failed to play after unmute:", playErr);
                });
            },
            { once: true }
          );
        }
      })
      .catch((err) => {
        console.warn("Autoplay on enter blocked:", err);
        if (placeholder) placeholder.querySelector("p").textContent = "Click to play the video";
        if (overlay) overlay.classList.remove("hidden");
      });
  }

  // Called when leaving the services page
  function leaveServicesPage() {
    const v = document.getElementById("awardVideo");
    const placeholder = document.getElementById("videoPlaceholder");
    const overlay = document.getElementById("videoOverlay");

    if (!v) return;

    v.pause();
    try {
      v.currentTime = 0;
    } catch (err) {
      // ignore if seeking not allowed
    }

    v.classList.remove("show-video");
    if (placeholder) placeholder.classList.remove("hide-placeholder");
    if (overlay) overlay.classList.add("hidden");

    showNotification("Stopped video");
  }

  // Add this line to your initialization function
  loadVideo();

  // Also add to your image check intervals (optional)
  setInterval(loadVideo, 15000); // Check every 15 seconds

  // Initialize with improved error handling
  function initialize() {
    try {
      // Load images
      loadAwardImage();
      loadSchoolImage();

      // Start countdown
      update24HourCountdown();

      // Setup scroll indicators
      setupScrollIndicators();

      // Set up event listeners with improved mobile support
      window.addEventListener("wheel", handleScroll, { passive: false });
      window.addEventListener("touchstart", handleTouchStart, {
        passive: true,
      });
      window.addEventListener("touchend", handleTouchEnd, { passive: true });
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("resize", handleResize);

      // Initial resize setup
      handleResize();

      // Update countdown every second
      setInterval(update24HourCountdown, 1000);

      // Check for image changes (less frequent on mobile to save battery)
      const imageCheckInterval = window.innerWidth <= 768 ? 30000 : 10000; // 30s on mobile, 10s on desktop
      setInterval(loadAwardImage, imageCheckInterval);
      setInterval(loadSchoolImage, imageCheckInterval);

      // Show initial notification with better timing
      setTimeout(() => {
        showNotification(
          "Label Of The Year Award 2025 • Scroll or swipe to navigate"
        );
      }, 1500);
    } catch (error) {
      console.error("Initialization error:", error);
      showNotification("Error loading page. Please refresh.");
    }
  }

  // Start everything
  initialize();
});
