document.addEventListener("DOMContentLoaded", function () {
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
        }, 3000);
    }

    // Load video
    function loadVideo() {
        const videoUrl = "videos/award-video1.mp4";
        
        fetch(videoUrl, { method: 'HEAD' })
            .then(response => {
                if (response.ok) {
                    let source = videoElement.querySelector("source");
                    if (!source) {
                        source = document.createElement("source");
                        source.type = "video/mp4";
                        videoElement.appendChild(source);
                    }
                    source.src = videoUrl;
                    videoElement.load();
                    
                    videoElement.muted = true;
                    const tryPlay = videoElement.play();
                    
                    if (tryPlay !== undefined) {
                        tryPlay
                            .then(() => {
                                videoElement.classList.add("show-video");
                                videoPlaceholder.style.display = "none";
                                if (videoOverlay) videoOverlay.classList.remove("hidden");
                            })
                            .catch((err) => {
                                console.log("Autoplay prevented");
                                videoPlaceholder.querySelector("p").textContent = "Click to play video";
                                videoPlaceholder.style.display = "flex";
                            });
                    }
                } else {
                    videoPlaceholder.querySelector("p").textContent = "Video not found";
                }
            })
            .catch(error => {
                videoPlaceholder.querySelector("p").textContent = "Unable to load video";
            });
    }

    // Check school image
    function checkSchoolImage() {
        const img = new Image();
        img.onload = function() {
            schoolImageContainer.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('images/school-image.png')`;
            const placeholder = schoolImageContainer.querySelector('.placeholder-text');
            if (placeholder) placeholder.style.display = 'none';
        };
        img.onerror = function() {
            const placeholder = schoolImageContainer.querySelector('.placeholder-text');
            if (placeholder) {
                placeholder.textContent = 'PORTFOLIO IMAGE';
                placeholder.style.color = 'rgba(212, 185, 150, 0.15)';
            }
        };
        img.src = 'images/school-image.png';
    }

    // Event listeners
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
                    });
            }
        });
    }

    if (dmButton) {
        dmButton.addEventListener("click", function () {
            showNotification("📩 Contact us on Instagram @modelaward for our services");
        });
    }

    // Initialize
    function initialize() {
        loadVideo();
        checkSchoolImage();
        
        setTimeout(() => {
            showNotification("Welcome to our Services Page!");
        }, 1000);
        
        setInterval(checkSchoolImage, 30000);
    }

    initialize();
});