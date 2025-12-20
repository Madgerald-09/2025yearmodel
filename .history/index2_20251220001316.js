document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const videoElement = document.getElementById("awardVideo");
    const videoPlaceholder = document.getElementById("videoPlaceholder");
    const videoOverlay = document.getElementById("videoOverlay");
    const overlayBtn = document.getElementById("videoOverlayBtn");
    const dmButton = document.getElementById("dmButton");
    const notification = document.getElementById("notification");
    const schoolImageContainer = document.getElementById("schoolImageContainer");

    // Show notification
    function showNotification(message) {
        notification.querySelector("p").textContent = message;
        notification.classList.add("show");

        setTimeout(() => {
            notification.classList.remove("show");
        }, 4000);
    }

    // Load and play video
    function loadVideo() {
        const videoUrl = "videos/award-video1.mp4";
        
        console.log("Loading video from:", videoUrl);
        
        // Check if video exists
        fetch(videoUrl, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    // Video exists, set up video element
                    let source = videoElement.querySelector("source");
                    if (!source) {
                        source = document.createElement("source");
                        source.type = "video/mp4";
                        videoElement.appendChild(source);
                    }
                    source.src = videoUrl;
                    videoElement.load();
                    
                    // Try to play muted (most browsers allow this)
                    videoElement.muted = true;
                    
                    const tryPlay = videoElement.play();
                    
                    if (tryPlay !== undefined) {
                        tryPlay
                            .then(() => {
                                // Autoplay succeeded
                                videoElement.classList.add("show-video");
                                videoPlaceholder.style.display = "none";
                                
                                // Show overlay for sound enable
                                if (videoOverlay) {
                                    videoOverlay.classList.remove("hidden");
                                    showNotification("Video is playing (muted)");
                                }
                            })
                            .catch((err) => {
                                // Autoplay was prevented
                                console.log("Autoplay prevented:", err);
                                videoPlaceholder.querySelector("p").textContent = "Click to play video";
                                videoPlaceholder.style.display = "flex";
                                
                                // Add click handler to placeholder
                                videoPlaceholder.addEventListener("click", playVideoOnClick, { once: true });
                            });
                    }
                    
                    // Video error handling
                    videoElement.addEventListener("error", function (e) {
                        console.error("Video error:", e);
                        videoPlaceholder.innerHTML = `
                            <i class="fas fa-exclamation-triangle"></i>
                            <h3>Video Error</h3>
                            <p>Could not load video</p>
                            <p style="font-size:12px;margin-top:10px;">Check award-video1.mp4 in videos folder</p>
                        `;
                        videoPlaceholder.style.display = "flex";
                    });
                } else {
                    // Video not found
                    console.warn("Video not found:", videoUrl);
                    videoPlaceholder.innerHTML = `
                        <i class="fas fa-video-slash"></i>
                        <h3>Video Not Found</h3>
                        <p>Place award-video1.mp4 in videos folder</p>
                    `;
                    videoPlaceholder.style.display = "flex";
                }
            })
            .catch(error => {
                console.error("Error checking video:", error);
                videoPlaceholder.innerHTML = `
                    <i class="fas fa-exclamation-circle"></i>
                    <h3>Unable to Load Video</h3>
                    <p>Check your video file</p>
                `;
                videoPlaceholder.style.display = "flex";
            });
    }

    // Play video on click
    function playVideoOnClick() {
        videoElement.muted = false;
        videoElement.play()
            .then(() => {
                videoElement.classList.add("show-video");
                videoPlaceholder.style.display = "none";
                if (videoOverlay) videoOverlay.classList.add("hidden");
                showNotification("Video playing with sound");
            })
            .catch((playErr) => {
                console.error("Play failed:", playErr);
                showNotification("Could not play video");
            });
    }

    // Check and load school image
    function checkSchoolImage() {
        const img = new Image();
        img.onload = function() {
            console.log('✅ School image loaded successfully');
            schoolImageContainer.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('images/school-image.png')`;
            
            // Remove placeholder text
            const placeholder = schoolImageContainer.querySelector('.placeholder-text');
            if (placeholder) {
                placeholder.style.display = 'none';
            }
        };
        img.onerror = function() {
            console.warn('⚠️ School image not found');
            const placeholder = schoolImageContainer.querySelector('.placeholder-text');
            if (placeholder) {
                placeholder.textContent = 'PORTFOLIO IMAGE';
                placeholder.style.color = 'rgba(255, 255, 255, 0.15)';
            }
        };
        img.src = 'images/school-image.png';
    }

    // Set up overlay button
    if (overlayBtn) {
        overlayBtn.addEventListener("click", function () {
            if (videoElement) {
                videoElement.muted = false;
                videoElement.play()
                    .then(() => {
                        if (videoOverlay) videoOverlay.classList.add("hidden");
                        showNotification("Sound enabled");
                    })
                    .catch((playErr) => {
                        console.error("Failed to play after unmute:", playErr);
                        showNotification("Could not enable sound");
                    });
            }
        });
    }

    // DM Button click handler
    if (dmButton) {
        dmButton.addEventListener("click", function () {
            showNotification("📩 Contact us on Instagram @modelaward");
            
            // Add click animation
            this.style.transform = "scale(0.95)";
            setTimeout(() => {
                this.style.transform = "scale(1)";
            }, 150);
        });
    }

    // Initialize everything
    function initialize() {
        // Load video
        loadVideo();
        
        // Check school image
        checkSchoolImage();
        
        // Show welcome notification
        setTimeout(() => {
            showNotification("Welcome to our Services Page! 🎬");
        }, 1000);
        
        // Check for image changes periodically
        setInterval(checkSchoolImage, 60000); // Check every minute
        
        // Handle window resize
        window.addEventListener('resize', function() {
            checkSchoolImage();
        });
    }

    // Start the application
    initialize();
});